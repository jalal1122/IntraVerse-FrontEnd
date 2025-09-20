import { useEffect } from "react";

export default function AdsterraPopunder() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//pl27685120.revenuecpmgate.com/${
      location.hostname === "intraverse.me"
        ? "ad/c4/87/adc4872ebaa07484bd26784edb3b79c6"
        : "76/97/18/7697188f4ab1809a3a44daf9dafdbcad"
    }.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Placeholder where the ad will load
  return <div id="adsterra-popunder"></div>;
}
