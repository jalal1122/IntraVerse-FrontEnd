import { useEffect } from "react";

export default function AdsterraAd() {
  useEffect(() => {
    // Create the first script (atOptions)
    const inlineScript = document.createElement("script");
    inlineScript.type = "text/javascript";
    inlineScript.innerHTML = `
      atOptions = {
        'key': ${
          location.hostname === "intraverse.me"
            ? "'20c4f87df7f217fffc7ed1701627e34e' "
            : "'0ac05d29aeab894b2307b2aae8382523'"
        },
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
    `;
    document.body.appendChild(inlineScript);

    // Create the second script (invoke.js)
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//www.highperformanceformat.com/${
      location.hostname === "intraverse.me"
        ? "20c4f87df7f217fffc7ed1701627e34e"
        : "0ac05d29aeab894b2307b2aae8382523"
    }/invoke.js`;
    document.body.appendChild(script);

    console.log("Adsterra ad scripts added to the document.");

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(inlineScript);
      document.body.removeChild(script);
    };
  }, []);

  return <div id="adsterra-ad"></div>;
}
