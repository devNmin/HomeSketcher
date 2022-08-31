import json
    
with open ("ikea_mod.json", "r") as f:
    data = json.load(f)

print(len(data)) # 11823