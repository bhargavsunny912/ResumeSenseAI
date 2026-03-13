/* eslint-disable no-undef */

let tooltip

document.addEventListener("mouseup",()=>{

    const selectedText = window.getSelection().toString().trim()

    if(selectedText.length > 100){
        createTooltip(selectedText)
    }

})

function createTooltip(selectedText){

    if(tooltip) tooltip.remove()

    tooltip = document.createElement("div")

    tooltip.innerText = "Check Resume Score"

    tooltip.style.position = "absolute"
    tooltip.style.background = "linear-gradient(135deg,#4f46e5,#9333ea)"
    tooltip.style.color = "white"
    tooltip.style.padding = "10px 14px"
    tooltip.style.borderRadius = "8px"
    tooltip.style.fontSize = "13px"
    tooltip.style.fontWeight = "600"
    tooltip.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)"
    tooltip.style.cursor = "pointer"
    tooltip.style.zIndex = "999"
    tooltip.style.transition = "all 0.2s ease"
    tooltip.style.fontFamily = "system-ui, -apple-system, sans-serif"
    tooltip.style.display = "inline-block"
    tooltip.style.whiteSpace = "nowrap"
    // tooltip.style.userSelect = "none"

    const range = window.getSelection().getRangeAt(0)
    const rect = range.getBoundingClientRect()

    tooltip.style.top=`${rect.bottom+window.scrollY}px`
    tooltip.style.left=`${rect.left+window.scrollX}px`

    tooltip.onclick = ()=>{

        tooltip.innerText="Analyzing..."

        chrome.runtime.sendMessage({
            type:"CHECK_SCORE",
            jd:selectedText
        },
        (response)=>{
            tooltip.innerText = `ATS Score: ${response} 🚀\nClick extension icon for full report`
            setTimeout(()=>{
                tooltip.style.display="none"
            },5000);
        }
    );

    }

    document.body.appendChild(tooltip)
}