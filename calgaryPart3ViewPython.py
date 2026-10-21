#!C:\ms4w\Python\python

import sqlite3
import os
from urllib.parse import parse_qs
print ("Content-Type: text/plain;charset=utf-8")
print()

params = parse_qs(os.environ.get("QUERY_STRING", ""))
water_type = params.get("waterType", [None])[0]
quadrant = params.get("quadrant", [None])[0]
junction_query = params.get("query", [None])[0]

conn = sqlite3.connect("canvec_11397_50K_4617_gpkg.gpkg")

if water_type is not None:
    if water_type not in ("Lake", "Watercourse", "Reservoir"):
        print("Invalid water type.")
    else:
        sql = """
        SELECT COUNT(*)
        FROM waterbody_2
        WHERE water_definition_en = ?
        """
        count = conn.execute(sql, (water_type,)).fetchone()[0]
        print("SQL query:")
        print(sql.strip())
        print("Parameter:", water_type)
        print("Count:", count)

elif quadrant is not None:
    if quadrant not in ("Northwest", "Northeast", "Southwest", "Southeast"):
        print("Invalid quadrant.")
    else:
        sql = """
        SELECT COUNT(*)
        FROM road_segment_1
        WHERE of_municipal_quadrant_left = ?
        """
        count = conn.execute(sql, (quadrant,)).fetchone()[0]
        print("SQL query:")
        print(sql.strip())
        print("Parameter:", quadrant)
        print("Road segments in quadrant:", count)

elif junction_query == "junction_count":
    sql = "SELECT COUNT(*) FROM road_junction_0"
    count = conn.execute(sql).fetchone()[0]
    print("SQL query:")
    print(sql)
    print("Junctions in Calgary:", count)

conn.close()

if water_type is None and quadrant is None and junction_query != "junction_count":
    with open(__file__, "r", encoding="utf-8") as source:
        print(source.read())
