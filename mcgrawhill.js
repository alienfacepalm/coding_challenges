/* Lorem Ipsum Generator

   Lorem Ipsum filler text is often used to mock how a page might look with real-looking text.

   Your task is to create a program that generates filler text like you can see that our program 
   produced by changing the function "generateIpsum()" below.
   
   The source for the filler words must come from the variable "words" to produce about 1000 
   characters of output.
   
   The time limit for this task is 20 minutes. If you run out of time, it is sufficient to 
   explain how your solution is better or worse than the output of our program and how you 
   would improve it if you had more time.
   
   Send the contents of this pane and the contents of the Result pane as text files when done.
   
*/

var words = "The sky above the port was the color of television, tuned to a dead channel. All this happened, more or less. I had the story, bit by bit, from various people, and, as generally happens in such cases, each time it was a different story. It was a pleasure to burn.";

function generateIpsum() {
  var final = "",
      count = 0,
      //minimum sentence word length
      min = 3,
      //whitelist words to remain capitalized
      capWhitelist = ["I"],
      saneList = function(wordList) {
    
    		//unwhitelisted to lowercase, remove duplicates
    		return wordList
               .map(function(word){
                   return !!~capWhitelist.indexOf(word) ? word : word.toLowerCase();
               })
               .filter(function(word, index, self){
        				   return self.indexOf(word) === index;
        });

      }(words.replace(/[\,\.]/gi, '').split(/\s/)); //pass words array minus , and .

  //Run in loop while string is less than 1000 (blocking)
  while (final.length < 1000) {
    var word = saneList[Math.floor(Math.random() * saneList.length)];

    //capitalize new sentence
    if (count === 0) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    //increment word count in current sentence
    count++;

    //if enough words are in the current sentence
    //randomly decide to end the sentence
    if (count >= min) {
      if (Math.random() * 100 > Math.random() * 100) {
        count = 0;
        word += ".";
      }
    }

    //add space if not last word
    if (final.length < 1000) {
      word += " ";
    }

    //concatenate onto final output string
    final += word;
  }

  return final;
}

document.getElementById('fill').innerHTML = generateIpsum();
