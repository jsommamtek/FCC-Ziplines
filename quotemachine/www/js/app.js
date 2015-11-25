/* APPLICATION JAVASCRIPT */
$(document).ready(function () {

   // Set the quote image path
   var quoteImgPath = '/img/';

   // Load your quotes here
   var quotes = [
      ['"I am Gandalf the White. And I come back to you now… at the turn of the tide."'
      ,'– Gandalf',quoteImgPath + 'quote-1.jpg'],
      ['"I would rather share one lifetime with you than face all the Ages of this world alone."'
      ,'– Arwen',quoteImgPath + 'quote-2.jpg'],
      ['"I’m glad to be with you, Samwise Gamgee…here at the end of all things."'
      ,'- Frodo',quoteImgPath + 'quote-3.jpg'],
      ['"You are the luckiest, the canniest, and the most reckless man I ever knew. Bless you, laddie."'
      ,'– Gimli',quoteImgPath + 'quote-4.jpg'],
      ['"We swears, to serve the master of the Precious. We will swear on… on the Precious!"'
      ,'– Gollum',quoteImgPath + 'quote-5.jpg'],
      ['"A day may come when the courage of men fails… but it is not THIS day."'
      ,'– Aragorn',quoteImgPath + 'quote-6.jpg']
   ];

   // Vars to capture and compare random array indices when quote button is clicked
   var rndIdx = 0;
   var prevRndIdx = 0;

   // Process the click of the quote machine button
   $('form').submit(function (event) {

      // Capture the previous index
      prevRndIdx = rndIdx;

      // Get a random number between 0 and quotes array length
      // Don't allow duplicates back to back
      do {
         rndIdx = getRandomWholeNum(quotes.length - 1);
      } while (rndIdx === prevRndIdx);

      // Set the quote text input on the page
      $('#quoteText').text(quotes[rndIdx][0]);

      // Set the quote source on the page
      $('#quoteSource').text(quotes[rndIdx][1]);

      // Set the quote image on the page
      $('#quoteImg').attr('src', quotes[rndIdx][2]);

      // Show the quote content section
      $('#quoteSection').show();

      // Stop the form from submitting and refreshing the page
      event.preventDefault();

   });



   /* APP FUNCTIONS */
   function getRandomWholeNum(maxNum) {
      return Math.round(Math.random() * maxNum);
   }

}); //end $(document).ready()
