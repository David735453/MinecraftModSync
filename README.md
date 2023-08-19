# ModrinthModSync

Are you irritated of prompts every-now-and-then that ask you to update XYZ mod when you launch minecraft?? <br>
<b>Oh yeah, me too.</b> <br>
So I wrote this simple node program that does the job for you.
## 
Easily download the latest mods from Modrinth for a specific game version and loader (in my case, fabric).<br>
This command-line tool uses a custom JSON configuration to determine the game version, loader, and mods to download.

##

## Usage

1. <b>ModsJSON.json</b> is the configuration file:
   <ul><li>It defines game version, loader and list of mods.</li>
   <li><b>Mod_Name</b> is just a place holder and can be named anything you want.</li>
   <li><b>Project_ID</b> must be correct. Visit Modrinth to get the project id of the mod.</li></ul><br>

        Add more mods as required. Do not forget to add "," after every "}" when adding a new mods to list.
        Use below structure
        {
             "Mod_Name": <name>,
            "Project_ID": <id>
        }

Here is the sample attached

    ```json
    {
        "gameVersion": "1.20.1",
        "loader": "fabric",
        "modsList": [
            {
                "Mod_Name": "Sodium",
                "Project_ID": "AANobbMI"
            },
            {
                "Mod_Name": "Lithium",
                "Project_ID": "gvQqBUqZ"
            }
        ]
    }
    ```
    <br>
    

3. Run the tool with the configuration file as an argument:
   ```bash
   node index.js
   ```
   <br>

4. The tool will download the latest mod versions specified in the <b>ModsJSON.json</b>.<br><br>


## Why it needs to be defined Manually?
Uhh.. coz I am Lazy & didn't want to implement a complex mod manager like system.<br>
This is for those who use only a specifc set of mods and don't need to change it.<br>
In this case it becomes very easy to manually keep track of required mods.


## Contributions

Contributions are welcome! Feel free to open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the <b>GNU General Public License v3.0.<b>

## Acknowledgments

- This project utilizes the Modrinth API to retrieve mod information and download links.

