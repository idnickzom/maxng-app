# maxng-app

Max.ng API Documentation Star Wars<br>
Base API: https://swapi.dev/

This API repository consists of 5 end points

# End Point 1: List Movies

End Point URL: https://maxng-app.herokuapp.com/api/movies

Request Method: <b>GET</b>

This end point requires no input parameters.
The response from calling this API includes these properties:

<ul>
  <li><b>movie_id</b>: This displays the id of the movie</li> 
  <li><b>title</b>: This displays the title of the movie</li> 
  <li><b>opening_crawl</b>: This displays the opening crawl of the movie</li> 
  <li><b>release_date</b>: This displays the release date of the movie</li> 
  <li><b>no_comments</b>: This displays the no of anonymous comments on the movie</li> 
</ul>


# End Point 2: Add Anonymous Comment

End Point URL: https://maxng-app.herokuapp.com/api/comment/?movie_id={movie_id}&comment={comment}<br>
Example: https://maxng-app.herokuapp.com/api/comment/?movie_id=1&comment=Star%20wars%20is%20a%20great%20movie.

Request Method: <b>GET</b>

This end point requires two input parameters.
<ul>
  <li><b>movie_id</b>: This is the id of the movie associated with the comment from anonymous</li>
  <li><b>comment</b>: This is the comment from anonymous</li>
</ul>

The response from calling this API <b>successfully</b>:<br>
{
  "status": "200"
  "message": "success"
}


# End Point 3: List All Comments in Reverse Chronological Order

End Point URL: https://maxng-app.herokuapp.com/api/comments/

Request Method: <b>GET</b>

This end point requires no input parameters.
The response from calling this API includes these properties in the data object:

<ul>
  <li><b>id</b>: This displays the id of the comment</li> 
  <li><b>movie_id</b>: This displays the movie_id associated with the comment</li> 
  <li><b>comment</b>: This displays the comment by the anonymous</li> 
  <li><b>ip_address</b>: This displays the ip address of the anonymous</li> 
  <li><b>time_number</b>: This displays the UTC time number from 1970 till when the comment was made by the anonymous</li>
  <li><b>date_created</b>: This displays the date the comment of the anonymous</li>
</ul>


# End Point 4: List All Comment associated to a Particular Movie in Reverse Chronological Order

End Point URL: https://maxng-app.herokuapp.com/api/comments/movies/:movie_id<br>
Example: https://maxng-app.herokuapp.com/api/comments/movies/1

Request Method: <b>GET</b>

This end point requires an input parameter.
<ul>
  <li><b>movie_id</b>: This is the id of the movie</li>
</ul>

The response from calling this API includes these properties in the data object:

<ul>
  <li><b>id</b>: This displays the id of the comment</li> 
  <li><b>movie_id</b>: This displays the movie_id associated with the comment</li> 
  <li><b>comment</b>: This displays the comment by the anonymous</li> 
  <li><b>ip_address</b>: This displays the ip address of the anonymous</li> 
  <li><b>time_number</b>: This displays the UTC time number from 1970 till when the comment was made by the anonymous</li>
  <li><b>date_created</b>: This displays the date the comment of the anonymous</li>
</ul>


# End Point 5: Sort, Filter and Search for Character Lists per Page

End Point URL: https://maxng-app.herokuapp.com/api/characters/?page={page}&sort_type={sort_type}&order={order}&gender={gender}&search={search}<br>
Example: https://maxng-app.herokuapp.com/api/characters?sort_type=name&order=asc&page=1

Request Method: <b>GET</b>

This end point requires three <b>mandatory</b> and two <b>optional</b> input parameters.
<ul>
  <li><b>page</b>: This is the page number to call data from in the character list from the base API (https://swapi.dev/). This is mandatory and the default value is 1.</li>
  <li><b>sort_type</b>: This can either be name or height. The parameter to sort the object by. This is mandatory and the default value is name</li>
  <li><b>order</b>: This can either be asc or desc. asc stands for ascending order, desc stands for descending order. This is mandatory and the default value is asc</li>
  <li><b>gender</b>: This can be male, female or n/a. You can filter the result using any of these values. This is optional</li>
  <li><b>search</b>: This is a keyword used to search the result. This is optional</li>
</ul>

The response from the API call consists of:
<ui>
  <li><b>count</b>: This displays the number of characters in the list</li>
  <li><b>total_height</b></li>
    <ul>
      <li><b>cm</b>: The value of the total height in cm</li>
      <li><b>ft_in</b>: The value of the total height in feet and inches</li>
    </ul>
</ui>


# Error Response Template

{
    "status": xxx,
    "message": xx-xx-xx
}
