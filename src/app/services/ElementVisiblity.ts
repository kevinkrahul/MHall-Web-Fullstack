import { useState,useEffect } from "react";

export const ElementVisiblity = (elementId:string) => {

    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        const handleScoll=()=>{
            if(window.innerWidth){
                const element=document.getElementById(elementId);
                if(element){
                    const rect=element.getBoundingClientRect();
                    if(rect.top<window.innerHeight*0.85){
                        setIsVisible(true);
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScoll);
        handleScoll();
        return()=>window.removeEventListener("scroll",handleScoll);
    },[elementId]);
    return isVisible;
}