module.exports.getPokemon = () => ({
  "id": 1,
  "name": "bulbasaur",
  "base_experience": 64,
  "height": 7,
  "is_default": true,
  "order": 1,
  "weight": 69,
  "abilities": [
    {
      "is_hidden": true,
      "slot": 3,
      "ability": {
        "name": "chlorophyll"
      }
    }
  ],
  "forms": [
    {
      "name": "bulbasaur"
    }
  ],
  "game_indices": [
    {
      "game_index": 1,
      "version": {
        "name": "white-2"
      }
    }
  ],
  "held_items": [],
  "location_area_encounters": [],
  "moves": [
    {
      "move": {
        "name": "captivate"
      },
      "version_group_details": [
        {
          "level_learned_at": 0,
          "version_group": {
            "name": "heartgold-soulsilver"
          },
          "move_learn_method": {
            "name": "machine"
          }
        },
        {
          "level_learned_at": 0,
          "version_group": {
            "name": "platinum"
          },
          "move_learn_method": {
            "name": "machine"
          }
        },
        {
          "level_learned_at": 0,
          "version_group": {
            "name": "diamond-pearl"
          },
          "move_learn_method": {
            "name": "machine"
          }
        }
      ]
    }
  ],
  "species": {
    "name": "bulbasaur"
  },
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "speed"
      }
    }
  ],
  "types": [
    {
      "slot": 2,
      "type": {
        "name": "poison"
      }
    }
  ]
});
