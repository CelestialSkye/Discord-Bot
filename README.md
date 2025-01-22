This is a bot i made for my own convenience

You need to change the api keys and use your own keys in bot.json 

# [How to install]
```
git clone https://github.com/CelestialSkye/Discord-Bot.git
npm install
node .
```

# [How to config] 
```
{
    "description_imgur": "This is Imgur API key ",
    "token": "",
    "GUILD_TEST": "guild test id",
    "IMGUR_CLIENT_ID": "your imgur client id",
    "CLIENT_SECRET": "the client secret",
    "REFRESH_TOKEN": "imgur refresh token",
    "ACCESS_TOKEN": "imgur access token",

    "description_weather": "This is Openweather API key ",
    "apiToken": "openweather api key",

    "description_MAL_API": "This is MAL api",
    "MAL_CLIENT_ID": "your mal client id"


}


```


The Discord bot connection part was originaly made by https://github.com/devPhytols
I cloned this project from them because i wanted an imgur bot that can upload images for me using discord bot
but it grew into something more, i modified the original code so it can take more image formats and gifs, also it can now take image attachments, just copy the image you want to upload select the image option when typing /imgur and paste the image you wanna upload.


I also added some other slash commands like a command to know the weather in any city, a purge command to delete messages, and another command that can give you information about anime using MAL (My Anime List).
also added a command that gets me ffxiv memes from r/ShitpostXIV for some reason.
I might add other commands if i feel like it.

# [Credits]
This project is based on [devPhytols-Web](https://github.com/devPhytols/UpImgur-Bot-Discord) by [devPhytols](https://github.com/devPhytols).
