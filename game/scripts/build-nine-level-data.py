"""Build the offline nine-room interaction data from reviewed case and PNG catalogs."""
import csv
import json
from pathlib import Path

workspace = Path(__file__).resolve().parents[2]
game = workspace / "game"
skills = workspace / "deposit_wars_skills"

with (skills / "artifacts/design/TASK-016_DRAG_OBJECT_CATALOG.csv").open(encoding="utf-8-sig", newline="") as file:
    cases = {row["event_id"]: row for row in csv.DictReader(file)}
with (skills / "artifacts/art/TASK-017_PROP_ASSET_MAP.csv").open(encoding="utf-8-sig", newline="") as file:
    assets = {row["event_id"]: row for row in csv.DictReader(file)}

# Nine different fictional housing types. Every room carries two case problems per role.
rooms = [
    ("海景公寓", "城市公寓客厅", 2, ("E01", "E02"), ("E04", "E05")),
    ("校园宿舍", "双人宿舍卧室", 2, ("E03", "E20"), ("E06", "E10")),
    ("联排屋", "合租厨房", 3, ("E08", "E09"), ("E11", "E12")),
    ("老式步梯公寓", "旧浴室", 3, ("E13", "E14"), ("E16", "E29")),
    ("独栋洋房", "阁楼卧室", 4, ("E15", "E19"), ("E22", "E23")),
    ("地下室套间", "低层起居室", 4, ("E21", "E31"), ("E28", "E17")),
    ("微型单间", "一室多用空间", 5, ("E07", "E26"), ("E24", "E30")),
    ("青年长租公寓", "共享客厅", 5, ("E25", "E27"), ("E18", "E34")),
    ("后院小屋", "改造车库单间", 6, ("E32", "E33"), ("E36", "E35")),
]
requirements = [(1, 1), (1, 1), (2, 1), (1, 2), (2, 2), (2, 2), (2, 3), (2, 3), (3, 3)]
zones = [
    {"tenant": [(12, 22, 16, 43), (34, 27, 15, 39)], "landlord": [(90, 42, 9, 20), (56, 31, 15, 25)]},
    {"tenant": [(4, 30, 14, 30), (22, 20, 15, 24)], "landlord": [(13, 55, 18, 25), (39, 67, 22, 22)]},
    {"tenant": [(67, 22, 16, 25), (82, 40, 12, 20)], "landlord": [(42, 68, 20, 22), (83, 42, 14, 24)]},
    {"tenant": [(18, 18, 20, 30), (70, 20, 17, 28)], "landlord": [(11, 28, 17, 38), (40, 69, 23, 22)]},
    {"tenant": [(27, 68, 20, 19), (68, 20, 16, 29)], "landlord": [(62, 56, 19, 25), (32, 68, 20, 20)]},
    {"tenant": [(13, 38, 16, 28), (43, 16, 16, 25)], "landlord": [(57, 16, 16, 24), (18, 43, 17, 27)]},
    {"tenant": [(77, 32, 17, 28), (28, 55, 18, 23)], "landlord": [(8, 39, 18, 30), (24, 42, 17, 26)]},
    {"tenant": [(17, 21, 18, 26), (62, 62, 20, 25)], "landlord": [(82, 42, 16, 28), (67, 38, 18, 26)]},
    {"tenant": [(38, 68, 20, 16), (78, 59, 18, 25)], "landlord": [(7, 36, 17, 28), (34, 72, 24, 15)]},
]


def public_path(value):
    relative = Path(value).as_posix().removeprefix("game/")
    assert (game / relative).is_file(), relative
    return relative


def case_items(event_id):
    asset = assets[event_id]
    return [public_path(asset["primary_png"])] + [public_path(part.strip()) for part in asset["additional_pngs"].split("|") if part.strip()]


levels = []
for index, (home, room, capacity, tenant_ids, landlord_ids) in enumerate(rooms):
    roles = {}
    for role, ids in (("tenant", tenant_ids), ("landlord", landlord_ids)):
        case_list = []
        for case_index, (event_id, count) in enumerate(zip(ids, requirements[index])):
            source = cases[event_id]
            available = case_items(event_id)
            assert len(available) >= count, (event_id, count)
            case_list.append({
                "id": event_id,
                "caseId": source["source_case_id"],
                "title": source["opponent_archetype"].split("·", 1)[-1],
                "cue": source["visible_cue"],
                "truth": source["visible_result"],
                "boundary": source["source_boundary"],
                "zone": zones[index][role][case_index],
                "items": [{"id": f"{event_id}-{item_index}", "src": image} for item_index, image in enumerate(available[:count])],
            })
        assert sum(len(item["items"]) for item in case_list) == capacity
        decoy_role = "landlord" if role == "tenant" else "tenant"
        decoy_event = (landlord_ids if role == "tenant" else tenant_ids)[0]
        roles[role] = {"cases": case_list, "decoy": {"id": f"decoy-{decoy_event}", "src": case_items(decoy_event)[0]}}
    levels.append({
        "number": index + 1,
        "home": home,
        "room": room,
        "capacity": capacity,
        "background": f"public/nine-homes/room-{index + 1:02}.png",
        "roles": roles,
    })

assert len(levels) == 9
assert len({case["id"] for level in levels for role in level["roles"].values() for case in role["cases"]}) == 36
output = game / "nine-level-data.js"
output.write_text("window.NINE_LEVELS = " + json.dumps(levels, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print(f"Wrote {output}: 9 rooms, 36 cases, 68 role-specific collectable items")
