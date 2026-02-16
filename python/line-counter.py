import os
from pathlib import Path
from collections import defaultdict
import time

EXTENSIONS = {
    ".py": "Python",
    ".jsx": "JSX",
    ".js": "JavaScript",
    ".css": "CSS",
    ".html": "HTML",
}

EXCLUDED_DIRS = {
    ".venv",
    "venv",
    "node_modules",
    ".git",
    "__pycache__",
    "dist",
    "build",
    ".idea",
    "backup"
}

def count_lines(file_path):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return sum(1 for _ in f)
    except Exception:
        return 0


def main():
    root_dir = Path(__file__).resolve().parent.parent.parent

    project_stats = defaultdict(lambda: defaultdict(int))
    project_totals = defaultdict(int)
    global_language_totals = defaultdict(int)
    global_total = 0

    start_time = time.time()
    files_processed = 0

    print(f"Scanning root directory: {root_dir}\n")

    for root, dirs, files in os.walk(root_dir):
        # PRUNE heavy directories BEFORE descending
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

        root_path = Path(root)

        # Determine project name
        try:
            relative = root_path.relative_to(root_dir)
            if not relative.parts:
                continue
            project_name = relative.parts[0]
        except ValueError:
            continue

        for file in files:
            ext = Path(file).suffix.lower()
            if ext not in EXTENSIONS:
                continue

            file_path = root_path / file
            lines = count_lines(file_path)

            language = EXTENSIONS[ext]

            project_stats[project_name][language] += lines
            project_totals[project_name] += lines
            global_language_totals[language] += lines
            global_total += lines

            files_processed += 1

        # Lightweight progress indicator (per directory)
        if files_processed and files_processed % 200 == 0:
            elapsed = time.time() - start_time
            print(f"Processed {files_processed} files | {elapsed:.1f}s elapsed")

    print("\n===== PER PROJECT =====")
    for project in sorted(project_stats):
        print(f"\nProject: {project}")
        for language in sorted(project_stats[project]):
            print(f"  {language}: {project_stats[project][language]:,}")
        print(f"  TOTAL: {project_totals[project]:,}")

    print("\n===== GLOBAL TOTALS =====")
    for language in sorted(global_language_totals):
        print(f"{language}: {global_language_totals[language]:,}")
    print(f"\nGRAND TOTAL: {global_total:,}")

    print(f"\nCompleted in {time.time() - start_time:.2f} seconds")


if __name__ == "__main__":
    main()
