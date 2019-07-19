/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
	let div = document.createElement("div");
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};

const createTweetElement = function(obj) {
	// const $tweet = $("<article>").addClass("content");

	const markUp = `
	
  <div class = "user">
	<header>
     <img src=${obj.user.avatars} alt="">
     <span class="user-name">${obj.user.name}</span>
     <span class="user-handle">${obj.user.handle}</span>
  </header>
    <div class = "content">
      <span>${escape(obj.content.text)}</span>
		 </div>
 <footer>
     <div class = "time">
      <span>${moment(new Date(obj.created_at)).fromNow()}</span>
			<div class = "icons">
			<img class = "flag" src="/images/flag.png" />
			<img class = "retweet" src="/images/retweet.png" />
			<img class = "heart" src="/images/heart.png" />
			</div>
		 </div>
</footer>
</div>
</br>`;
	return markUp;
	// return $tweet.append(markUp);
};

const renderTweets = function(tweets) {
	let arr = [];
	for (let post of tweets) {
		arr.unshift(createTweetElement(post));
	}
	$("#tweet-container").append(arr);
};

const loadTweets = function() {
	$.ajax({
		url: `/tweets/`,
		method: "GET",
		dataType: "json",
		success: function(data) {
			$("#tweet-container").empty();
			renderTweets(data);
		}
	});
};

const formSubmission = function() {
	$("#submit-form").submit(function(event) {
		event.preventDefault();
		let tweetTextArea = $(".text1").val();
		let notEnoughText = "Please enter a tweet!";
		let tooMuchText = "Your tweet is too long!";

		if (tweetTextArea === "") {
			$(".alert").slideDown(function() {
				$(".alert").text(notEnoughText);
			});
		} else if (tweetTextArea.length > 140) {
			$(".alert").slideDown(function() {
				$(".alert").text(tooMuchText);
			});
		} else {
			$(".alert").hide();
			$.ajax("/tweets/", {
				method: "POST",
				data: $(this).serialize()
			}).then(function() {
				loadTweets();
				$(".text1").val("");
				$(".counter").text("140");
			});
		}
	});
};

const clickToggle = function() {
	$(".new-tweet-main").slideToggle("slow");
};

$(document).ready(function() {
	loadTweets();
	formSubmission();
	$(".new-tweet-main").hide();
});
