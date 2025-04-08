import networkx as nx
import psutil
from typing import List, Dict
import numpy as np
from collections import deque


class DeadlockDetector:
    def __init__(self):
        self.wait_for_graph = nx.DiGraph()
        self.history_buffer = deque(maxlen=100)  # Stores the latest 100 system snapshots
        self.last_risk = 0.0  # For smoothing risk values

    def update_wait_for_graph(self) -> None:
        """Update the wait-for graph by assuming processes with high CPU or memory usage may conflict."""
        self.wait_for_graph.clear()

        try:
            processes = list(psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']))
        except Exception as e:
            print(f"Error retrieving processes: {e}")
            return

        for proc in processes:
            try:
                self.wait_for_graph.add_node(proc.pid)
                for other_proc in processes:
                    if proc.pid != other_proc.pid:
                        if self._is_conflicting(proc.info, other_proc.info):
                            self.wait_for_graph.add_edge(proc.pid, other_proc.pid)
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

    def _is_conflicting(self, proc_info: Dict, other_info: Dict) -> bool:
        """Heuristic to detect potential resource conflicts."""
        return (
            (proc_info['cpu_percent'] > 70 and other_info['cpu_percent'] > 70) or
            (proc_info['memory_percent'] > 70 and other_info['memory_percent'] > 70)
        )

    def detect_deadlocks(self) -> List[List[int]]:
        """Detect cycles in the wait-for graph which indicate potential deadlocks."""
        try:
            return list(nx.simple_cycles(self.wait_for_graph))
        except (nx.NetworkXNoCycle, nx.NetworkXError):
            return []

    def collect_system_metrics(self) -> Dict:
        """Gather current CPU, memory, process count, and swap usage metrics."""
        try:
            metrics = {
                'cpu_percent': psutil.cpu_percent(),
                'memory_percent': psutil.virtual_memory().percent,
                'process_count': len(psutil.pids()),
                'swap_percent': psutil.swap_memory().percent
            }
            self.history_buffer.append(metrics)
            return metrics
        except Exception as e:
            print(f"Error collecting metrics: {e}")
            return {
                'cpu_percent': 0,
                'memory_percent': 0,
                'process_count': 0,
                'swap_percent': 0
            }

    def predict_deadlock_risk(self) -> float:
        """
        Predict the likelihood of a deadlock based on:
        - CPU usage
        - Memory usage
        - Presence of cycles in the wait-for graph
        """
        metrics = self.collect_system_metrics()

        # Calculate risk factors
        cpu_risk = metrics['cpu_percent'] / 100.0
        memory_risk = metrics['memory_percent'] / 100.0
        cycles = self.detect_deadlocks()
        cycle_risk = min(len(cycles) * 0.2, 0.6)  # Each cycle adds 0.2, capped at 0.6

        # Weighted risk formula
        raw_risk = (
            0.4 * cpu_risk +
            0.3 * memory_risk +
            0.3 * cycle_risk
        )

        # Smooth out sudden jumps
        smoothed_risk = 0.7 * raw_risk + 0.3 * self.last_risk
        self.last_risk = smoothed_risk

        return round(smoothed_risk, 4)

    def suggest_resolution(self, deadlock_cycle: List[int]) -> List[Dict]:
        """
        Suggest actions for processes involved in a deadlock cycle:
        - Kill: High CPU usage
        - Restart: High memory usage
        - Monitor: Otherwise
        """
        suggestions = []
        total_memory = psutil.virtual_memory().total

        for pid in deadlock_cycle:
            try:
                proc = psutil.Process(pid)
                cpu_percent = proc.cpu_percent()
                memory_percent = (proc.memory_info().rss / total_memory) * 100

                if cpu_percent > 80:
                    action = 'kill'
                    reason = 'High CPU usage'
                elif memory_percent > 80:
                    action = 'restart'
                    reason = 'High memory usage'
                else:
                    action = 'monitor'
                    reason = 'Part of deadlock cycle'

                suggestions.append({
                    'pid': pid,
                    'process_name': proc.name(),
                    'action': action,
                    'reason': reason
                })

            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        return suggestions
