# MinecraftModSync

Are you irritated of prompts every-now-and-then that ask you to update XYZ mod when you launch minecraft?? <br>
<b>Oh yeah, me too.</b> <br>
So I wrote this simple node program that does the job for you. It will download the latest mods in one click.

## 
Easily download the latest mods from <b>Modrinth & CurseForge</b> for specified game version and loader (in my case, fabric).<br>
This command-line tool uses a custom JSON configuration to determine the game version, loader, and mods to download.

##

## Usage

1. <b>ModsConfig.json</b> is the configuration file:
   <ul><li>It defines game version, loader and list of mods.</li>
   <li><b>Mod_Name</b> is just a place holder and can be named anything you want.</li>
   <li><b>Project_ID</b> must be correct. Visit Modrinth to get the project id of the mod.</li></ul><br>

        Add more mods as required. Do not forget to add "," after every "}" when adding a new mods to list.
        Use below json structure
        {
             "Mod_Name": <name>,
            "Project_ID": <id>
        }

   Here is the sample attached - Seprate list maintained for modrinth and Curseforge mods. 
   
   ```json
    {
        "gameVersion": "1.20.1",
        "loader": "fabric",
        "modsList_Modrinth": [
            {
                "Mod_Name": "Fabric API",
                "Project_ID": "P7dR8mSH"
            },
            {
                "Mod_Name": "Sodium",
                "Project_ID": "AANobbMI"
            },
            {
                "Mod_Name": "Lithium",
                "Project_ID": "gvQqBUqZ"
            }
        ],
        "modsList_CurseForge": [
            {
                "Mod_Name": "Litematica",
                "Project_ID": "308892"
            }
        ]
    }
   ```

   <br>
    

3. CurseForge required API KEY. Create a .env file to define your API KEY. 
 ```
 CF_API_KEY=<api-key>
 ```


4. Run the tool with the configuration file as an argument:
```bash
node index.js
```
<br>

5. The tool will download the latest mod versions specified in the <b>ModsConfig.json</b>.<br><br>


## Why it needs to be defined Manually?
Ahhh.. coz I am Lazy & didn't want to implement a complex mod manager like system.<br>
This is for those who use only a specifc set of mods and don't need to change it often.<br>
In this case it becomes very easy to manually keep track of required mods.

## Wondering how lazy am I? Uhmm... this Lazy

 ```javascript
 let loaderType = (loader == 'fabric') ? 4 : 1; // Yes I am lazy... only supports either fabric or forge for curseforge API.
 ```

## For the nerds out you there 

get follows response from network tab for modrinth followed mods
Then use below code to get the array list to avoid manually configuring the list
```javascript
res = follows.filter(o => o.project_type === "mod").map(({ id, slug }) => ({ "Mod_Name": slug, "Project_ID": id }));
```

<br>Image for Reference <br><br>
![](https://i.ibb.co/vVDfpQx/Follows-Modrinth.jpg)

## Contributions

Suggestions / Contributions are welcome! Feel free to open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the <b>GNU General Public License v3.0.<b>

## Acknowledgments

- This project utilizes the Modrinth & CurseForge API to retrieve mod information and download links.

