import os
import json
from pathlib import Path
from collections import defaultdict
import tomllib  # Python 3.11+

EXCLUDED_DIRS = {
    ".venv",
    "venv",
    "node_modules",
    ".git",
    "__pycache__",
    "dist",
    "build",
    ".idea",
}

def parse_requirements(file_path):
    deps = set()
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                deps.add(line.split("==")[0].split(">=")[0])
    return deps

def parse_package_json(file_path):
    deps = set()
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for section in ["dependencies", "devDependencies"]:
                if section in data:
                    deps.update(data[section].keys())
    except Exception:
        pass
    return deps

def parse_pyproject(file_path):
    deps = set()
    try:
        with open(file_path, "rb") as f:
            data = tomllib.load(f)
            if "project" in data and "dependencies" in data["project"]:
                for dep in data["project"]["dependencies"]:
                    deps.add(dep.split()[0])
    except Exception:
        pass
    return deps

def main():
    root_dir = Path(__file__).resolve().parent.parent.parent

    project_stacks = defaultdict(lambda: defaultdict(set))
    global_stack = defaultdict(lambda: defaultdict(int))  # category -> dep -> count

    for project in root_dir.iterdir():
        if not project.is_dir():
            continue
        if project.name in EXCLUDED_DIRS:
            continue

        # Python
        req = project / "requirements.txt"
        pyproj = project / "pyproject.toml"

        if req.exists():
            project_stacks[project.name]["Python"].update(parse_requirements(req))

        if pyproj.exists():
            project_stacks[project.name]["Python"].update(parse_pyproject(pyproj))

        # Node / React
        package_json = project / "package.json"
        if package_json.exists():
            project_stacks[project.name]["Node/React"].update(parse_package_json(package_json))

        # Framework hints
        if (project / "manage.py").exists():
            project_stacks[project.name]["Framework"].add("Django")

        if (project / "next.config.js").exists():
            project_stacks[project.name]["Framework"].add("Next.js")

        if (project / "vite.config.js").exists():
            project_stacks[project.name]["Framework"].add("Vite")

        if (project / "Dockerfile").exists():
            project_stacks[project.name]["Infra"].add("Docker")

    # Build global frequency table
    for project in project_stacks:
        for category in project_stacks[project]:
            for dep in project_stacks[project][category]:
                global_stack[category][dep] += 1

    # -------- OUTPUT --------

    print("\n===== PER PROJECT =====")
    for project in sorted(project_stacks):
        print(f"\nProject: {project}")
        for category in project_stacks[project]:
            print(f"  {category}:")
            for dep in sorted(project_stacks[project][category]):
                print(f"    - {dep}")

    print("\n===== GLOBAL STACK SUMMARY =====")
    for category in global_stack:
        print(f"\n{category}:")
        for dep, count in sorted(global_stack[category].items(), key=lambda x: (-x[1], x[0])):
            print(f"  {dep} ({count} projects)")

if __name__ == "__main__":
    main()
