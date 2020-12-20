function warnFromConsole()
{
	console.log("%cWARNING!!!!", "color: #f00; background: #ffa399; padding: 0; font-size: 2em;");
	console.log("%cDo not paste/enter any code that you do not understand!!! Someone malicious could be able to access your searches or information!!! This is a way of hacking called Self-XSS", "font-size: 1.5em; font-family: arial; color: #fff; background: #f00; padding: 0;")
	console.log("%cIf you accidentally got into this space, then press the X in the right corner of the space and proceed with what you were doing.", "font-size: 1.3em; font-family: arial;")
}

warnFromConsole();




async function fetchPages()
{
	await fetch("https://SoftwareFuse.github.io/catsearcher/pages.json")
	.then(response => response.json())
	.then(data => {
		const pages = data;
		const articles = document.querySelectorAll(".article");
		let randomIndex1 = Math.floor(Math.random() * (100 - 0 + 1));
		let randomIndex2 = Math.floor(Math.random() * (200 - 100 + 1) + 100);
		let randomIndex3 = Math.floor(Math.random() * (300 - 200 + 1) + 200);

		articles[0].addEventListener("click", () => {
			document.location.href = pages[randomIndex1].url;
		});
		articles[1].addEventListener("click", () => {
			document.location.href = pages[randomIndex2].url;
		});
		articles[2].addEventListener("click", () => {
			document.location.href = pages[randomIndex3].url;
		});

		articles[0].innerHTML += `
			<h1 class="article-heading">${pages[randomIndex1].title}</h1>
		`;

		articles[1].innerHTML += `
			<h1 class="article-heading">${pages[randomIndex2].title}</h1>
		`;

		articles[2].innerHTML += `
			<h1 class="article-heading">${pages[randomIndex3].title}</h1>
		`;




		const input = document.querySelector(".search form input");

		input.addEventListener("input", (e) => {
			let val = input.value;

			if (val == "")
			{
				return;
			} else
			{
				if (val.indexOf("<") > -1 && val.indexOf(">") > -1 && val.indexOf("script") > -1)
				{
					let countDown = 10;
					setInterval(() => countDown--, 1000);
					setInterval(() => {
						document.body.innerHTML = `
							<h1 style="font-size: 2em;">It seems that you are trying to attempt an XSS attack</h1>
							<h3 style="text-align: center;">If you were meaning to do so, please do not. Hackers are meanies :(</h3>
							<h3 style="text-align: center;">If you are super confused and have no idea at what is happening right now, then just stay calm.</h3>
							<h2 style="text-align: center;">You have ${countDown} seconds until this page will reload and nothing will happen</h2>
						`;
						if (countDown == 0)
						{
							document.location.reload();
						}
					}, 1000);
				}
			}


		});

		document.querySelector(".search form").addEventListener("submit", (e) => {
			let relatedSearches = [];

			e.preventDefault();
			

			for (let i = 0; i < pages.length; i++)
			{
				if (input.value.indexOf('Breed:') > -1 || input.value.indexOf('breed:') > -1)
				{
					if (pages[i].title.indexOf(input.value.substring(6)) > -1)
					{
						relatedSearches.push(pages[i]);
					}
				}
				if (pages[i].title.indexOf(input.value) > -1)
				{
					relatedSearches.push(pages[i]);
				}
			}





			if (relatedSearches.length > 0)
			{
				document.body.innerHTML = `
					<div class="search">
						<form style="justify-content: center; position: fixed; z-index: 100;">
							<h4><a href=index.html>Back Home</a></h4>
						</form>
					</div>	
					<div class="results">
					
					</div>
					<div class="request">
						<h4>Can't Find What You're Looking For?</h5>
						<h5>Send CatSearcher A Website Request</h5>
						<input placeholder="Enter The Web Adress" class="submit-input" />
						<button>Request a kitty!</button>
					</div>
				`;


			} else
			{
				document.body.innerHTML = `
					<div class="search">
						<form style="justify-content: center;">
							<h4><a href=index.html>Back Home</a></h4>
							<div class="oops">
								<ul>
									<h2>Oops, looks like there aren't any results for ${input.value}</h2>
									<div class="img"></div>
									<li>If You Searched With The Breed: Tag, Is There Any Unecessary Spaces?</li>
									<li>Did You Type Every First Letter In All Words Uppercase?</li>
									<li>Did You Enter Less Details To Improve Accuracy?</li>
									<li>Is Your Search Related To Cats?</li>
								</ul>
							</div>
						</form>
					</div>	
					<div class="request">
						<h4>Can't Find What You're Looking For?</h5>
						<h5>Send CatSearcher A Website Request</h5>
						<input placeholder="Enter The Web Adress" class="submit-input" />
						<button>Request a kitty!</button>
					</div>
				`;
				document.querySelector(".request").style.top = "500px";
			}






			for (let i = 0; i < relatedSearches.length; i++)
			{
				let shortenedURL;
				let shortenedTitle;

				if (relatedSearches[i].title.length > 40)
				{
					shortenedTitle = relatedSearches[i].title.substring(0, 40) + "...";
				} else
				{
					shortenedTitle = relatedSearches[i].title;
				}


				if (relatedSearches[i].url.length > 60)
				{
					shortenedURL = relatedSearches[i].url.substring(0, 60) + "...";
				} else
				{
					shortenedURL = relatedSearches[i].url;
				}



				document.querySelector(".results").innerHTML += `
					<div>
						<h2><a href=${relatedSearches[i].url}>${shortenedTitle}</a></h2>
						<h4><a href=${relatedSearches[i].url}>${shortenedURL}</a></h4>
					</div>
				`;
			}



			document.querySelector("div button").addEventListener("click", () => {
				window.open('mailto:att.cubing.sharks@gmail.com?subject=Request A Kitten Website&body=I Want A Website On CatSearcher; Here Is The Website URL: ' + document.querySelector(".submit-input").value + '!!! :3');
			});




		});




		document.querySelector(".search form label").addEventListener("click", (e) => {
			let relatedSearches = [];

			e.preventDefault();
			

			for (let i = 0; i < pages.length; i++)
			{
				if (input.value.indexOf('Breed:') > -1 || input.value.indexOf('breed:') > -1)
				{
					if (pages[i].title.indexOf(input.value.substring(6)) > -1)
					{
						relatedSearches.push(pages[i]);
					}
				}
				if (pages[i].title.indexOf(input.value) > -1)
				{
					relatedSearches.push(pages[i]);
				}
			}





			if (relatedSearches.length > 0)
			{
				document.body.innerHTML = `
					<div class="search">
						<form style="justify-content: center; position: fixed; z-index: 100;">
							<h4><a href=index.html>Back Home</a></h4>
						</form>
					</div>	
					<div class="results">
					
					</div>
					<div class="request">
						<h4>Can't Find What You're Looking For?</h5>
						<h5>Send CatSearcher A Website Request</h5>
						<input placeholder="Enter The Web Adress" class="submit-input" />
						<button>Request a kitty!</button>
					</div>
				`;


			} else
			{
				document.body.innerHTML = `
					<div class="search">
						<form style="justify-content: center;">
							<h4><a href=index.html>Back Home</a></h4>
							<div class="oops">
								<ul>
									<h2>Oops, looks like there aren't any results for ${input.value}</h2>
									<div class="img"></div>
									<li>If You Searched With The Breed: Tag, Is There Any Unecessary Spaces?</li>
									<li>Did You Type Every First Letter In All Words Uppercase?</li>
									<li>Did You Enter Less Details To Improve Accuracy?</li>
									<li>Is Your Search Related To Cats?</li>
								</ul>
							</div>
						</form>
					</div>	
					<div class="request">
						<h4>Can't Find What You're Looking For?</h5>
						<h5>Send CatSearcher A Website Request</h5>
						<input placeholder="Enter The Web Adress" class="submit-input" />
						<button>Request a kitty!</button>
					</div>
				`;
				document.querySelector(".request").style.top = "500px";
			}






			for (let i = 0; i < relatedSearches.length; i++)
			{
				let shortenedURL;
				let shortenedTitle;

				if (relatedSearches[i].title.length > 40)
				{
					shortenedTitle = relatedSearches[i].title.substring(0, 40) + "...";
				} else
				{
					shortenedTitle = relatedSearches[i].title;
				}


				if (relatedSearches[i].url.length > 60)
				{
					shortenedURL = relatedSearches[i].url.substring(0, 60) + "...";
				} else
				{
					shortenedURL = relatedSearches[i].url;
				}



				document.querySelector(".results").innerHTML += `
					<div>
						<h2><a href=${relatedSearches[i].url}>${shortenedTitle}</a></h2>
						<h4><a href=${relatedSearches[i].url}>${shortenedURL}</a></h4>
					</div>
				`;
			}



			document.querySelector("div button").addEventListener("click", () => {
				window.open('mailto:att.cubing.sharks@gmail.com?subject=Request A Kitten Website&body=I Want A Website On CatSearcher; Here Is The Website URL: ' + document.querySelector(".submit-input").value + '!!! :3');
			});




		});










	});
}

fetchPages();



let loopText = [
	'Remember To Capitalize The First Letter Of Every Word For Accurate Search Results.',
	'CatSearcher Has High Accuracy So Type Less Details To Get More Results.',
	'CatSearcher Has A New Fact Every Time You Reload The Page Just Above The Search Bar!',
	'Cats Are Better Than Dogs!<br>Kittens Are Better Than Cats!'
];

let loopIndex = 0;
const loop = document.querySelector(".loop");

setInterval(() => {
	if (loopIndex == 4)
	{
		loopIndex = 0;
		setTimeout(() => {loop.innerHTML = loopText[loopIndex-1]; loop.style.opacity = 1}, 800);
		setTimeout(() => loop.style.opacity = 0, 3100);
		loopIndex++;
	} else if (loopIndex != 4)
	{
		setTimeout(() => {loop.innerHTML = loopText[loopIndex-1]; loop.style.opacity = 1}, 800);
		setTimeout(() => loop.style.opacity = 0, 3100);
		loopIndex++;
	}
}, 4000);




// fetch a cat fact
fetch("https://catfact.ninja/fact")
	.then(response => response.json())
	.then(data => {
		document.querySelector(".cat-fact strong").innerHTML = data["fact"].toString();
	});


const exit = document.querySelector(".exit");
let exitCount = 0;

exit.addEventListener("click", () => {
	exitCount++;
	if (exitCount % 2 != 0)
	{
		const articles = document.querySelectorAll(".article");
		for (let i = 0; i < articles.length; i++)
		{
			articles[i].style.height = "0px";
			articles[i].style.opacity = 0;
		}
		exit.innerHTML = "Expand <i class=\"fas fa-chevron-down\"></i>";
	} else if (exitCount % 2 == 0)
	{
		const articles = document.querySelectorAll(".article");
		for (let i = 0; i < articles.length; i++)
		{
			articles[i].style.height = "200px";
			articles[i].style.opacity = 1;
		}
		exit.innerHTML = "Hide <i class=\"fas fa-chevron-up\"></i>";
	}
});