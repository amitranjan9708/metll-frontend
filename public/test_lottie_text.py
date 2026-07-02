import json

with open("Data _ Searching.json", "r") as f:
    data = json.load(f)

# The text might be in assets or chars
if "chars" in data:
    print("Found chars! (Text converted to paths)")

if "assets" in data:
    for asset in data["assets"]:
        if "layers" in asset:
            for layer in asset["layers"]:
                if layer.get("nm") == "Text" or "t" in layer:
                    print(f"Found text layer in asset: {layer.get('nm')}")

