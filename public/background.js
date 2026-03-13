/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "CHECK_SCORE") {

    chrome.storage.local.remove("aiResult")

    chrome.storage.local.get(["resumeFile"], async (data) => {

      if (!data.resumeFile) {
        sendResponse("Please upload resume first");
        return;
      }

      const resume = data.resumeFile
      const jd = message.jd

      try {

        const response = await fetch("http://localhost:5000/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            file: resume,
            jd: jd
          })
        })

        const result = await response.json()

        sendResponse(result.score);

        chrome.storage.local.set({ aiResult: result })

      } catch (err) {
        console.log("API ERROR:", err)
      }

    })

    return true
  }

})
