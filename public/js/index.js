  
  
  /*like meme*/
  $('#like').click(function (e) {
    e.preventDefault();
    $.ajax({
      url: location.pathname,
      type: 'POST',
      success: function (msg) {
        if (msg.error) {
          alert(msg.error)
        }else{
            alert('done')
        }
        
      }
    });
  });

/*logout*/
  $('#logout').click(function (e) {
    $.ajax({
      url: '/logout',
      type: 'POST',
      success: function (msg) {
      }
    });
  });


    /*login*/
    const popup = () => {
        window.scrollTo(0, 0);
        document.getElementById('myForm').innerHTML = '<form action="/login" method="POST"> <div id="headline"> <p id="loginp">Login</p> <i  id="close" class="fa fa-times"></i   </div>  <br><br><hr><br>    <div class="form-group"><label for="exampleInputEmail1">username</label><input type="text" class="form-control" id="username" name="username" placeholder="Enter username"></div>  <div class="form-group"> <label for="exampleInputPassword1">Password</label>        <input type="password" minlength="7" class="form-control" id="password" name="password" placeholder="Password"> </div>    <button id="login" type="submit"   class="btn btn-primary">Submit</button></form>';
        document.getElementById("myForm").style.display = "block";
        document.getElementById('Body').className = 'myBody2';
  
        $('form').submit(function (e) {
          e.preventDefault()
  
          $.ajax({
            url: '/login',
            type: 'post',
            data: {
              username: $("#username").val(),
              password: $("#password").val()
            },
            statusCode: {
              400: (data) => {
                alert(data.responseJSON.error)
              },
              200: (data) => {
                console.log(data)
                $('form')[0].submit()
              }
            }
          })
        });
      }
  
    /*sign up*/
      const popup2 = () => {
        window.scrollTo(0, 0);
        document.getElementById('myForm2').innerHTML = '<form  action="/signup" method="POST"> <div id="headline">   <p id="loginp">Sign up</p>   <i  id="close" class="fa fa-times"></i>  </div>  <br><br><hr><br>   <div class="form-group">    <label >Full Name</label>   <input  class="form-control" id="username" name="username"  placeholder="Enter username"></div> <div class="form-group">   <label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" name="Email" id="Email" aria-describedby="emailHelp" placeholder="Enter email"></div> <div class="form-group"> <label for="exampleInputPassword1">Password</label>   <input type="password" minlength="7" name="password" class="form-control" id="password" placeholder="Password"> </div>   <button type="submit" id="signup" class="btn btn-primary">Submit</button></form>'
        document.getElementById("myForm2").style.display = "block";
        document.getElementById('Body').className = 'myBody2';
  
  
        $('form').submit(function (e) {
          e.preventDefault()
  
          $.ajax({
            url: '/signup',
            type: 'post',
            data: {
              username: $("#username").val(),
              Email: $("#Email").val(),
              password: $("#password").val()
            },
            statusCode: {
              400: (data) => {
                alert(data.responseJSON.error)
              },
              200: (data) => {
                alert('done you will be directed to home page')
                location.reload();
              }
            }
          })
  
        });
  
  
      }
  
      const popdown = () => {
        document.getElementById("myForm").innerHTML = "";
  
        document.getElementById("myForm").style.display = "none";
        document.getElementById('Body').className = null;
      }
  
      const popdown2 = () => {
        document.getElementById("myForm2").innerHTML = "";
        document.getElementById("myForm2").style.display = "none";
        document.getElementById('Body').className = null;
      }
      if(document.querySelector("#login")){
      document.querySelector("#login").addEventListener("click", function (e) {
        popup();
      document.getElementById("close").addEventListener("click", function () {
        popdown();
      });
    });
  
  
      document.querySelector("#signup").addEventListener("click", function () {
  
        popup2();
  
        document.getElementById("close").addEventListener("click", function () {
  
          popdown2();
  
        });
      });
    }

      $(function () {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 10) {
                $('.navbar').addClass('active');
            } else {
                $('.navbar').removeClass('active');
            }
        });
    });