/** Fetch user repos */
const getRepos = function(userHandle){
  // eslint-disable-next-line no-console
  console.log(userHandle);
  fetch(`https://api.github.com/users/${userHandle}/repos`)
    .then(response => {
      if (response.ok){
        return response.json();
      } throw new Error(response.statusText);
    })
    .then(responseJson => {
    //console.log(responseJson)
    //call function that will extract data and create a template for each one
      
      displayResults(responseJson);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function displayResults(data){
  $('.results-list').empty();
  $('#results-header').removeClass('hidden');  
  data.forEach(repo => {
    //below is object destructuring from the data we got from our fetch call 
    let {
      name,
      html_url,
      created_at,
      description
    } = repo;

    //will create a date object 
    let dateCreated = new Date(created_at);

    //append the html generated to the page
    $('.results-list').append(
      `<li>
        <h3><a href='${html_url}'>${name}</a></h3>
        <p>${description}</p>
        <p>${dateCreated}</p>
      </li>`
    );
  });
}

const watchForm = function(){
  $('.search-form').submit(event =>{
    event.preventDefault();
    let userHandle= $('.search').val();
    $('.search').val('');
    getRepos(userHandle);
  });
};

$(watchForm);