import React from 'react';

export const isEmpty = (value) => 
{
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

export const dateParser = (num) => 
{
    let options = 
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

export const validateYoutubeVideo = (url) =>
{
    if (url.includes("https://www.yout") || url.includes("https://yout"))
    {
        let embed = url.replace("watch?v=", "embed/").split("&")[0];
        return embed;
    }

    return url;
}