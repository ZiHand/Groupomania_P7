import React from 'react';

// ===================================================
// isEmpty
// ===================================================
export const isEmpty = (value) => 
{
    return (value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
    );
};

// ===================================================
// dateParser
// ===================================================
export const dateParser = (num) => 
{
    let options = 
    {
      hour: "2-digit",
      minute: "2-digit",
      //second: "2-digit",
      //weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      formatMatcher: "basic",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

// ===================================================
// validateYoutubeVideo
// ===================================================
export const validateYoutubeVideo = (url) =>
{
    if (url.includes("https://www.yout") || url.includes("https://yout"))
    {
        let embed = url.replace("watch?v=", "embed/").split("&")[0];
        return embed;
    }

    return url;
}