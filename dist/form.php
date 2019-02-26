<?php 
/*
ВНИМАНИЕ! Лучше всего в переменную myemail прописать почту домена, который использует сайт. А не mail.ru, gmail и тд.
*/
if(isset($_POST['submit'])){
/* Устанавливаем e-mail Кому и от Кого будут приходить письма */   
$to = "polovnikov1491@gmail.com";
 
/* Указываем переменные, в которые будет записываться информация с формы */
$first_name = $_POST['first-name'];
$last_name = $_POST['last-name'];
$birthday = $_POST['date'];
$gender = $_POST['gender'];
$country = $_POST['country'];
$email = $_POST['your-email'];
$password = $_POST['password'];
$adress = $_POST['your-address'];
$message = $_POST['your-message'];
     
/* Переменная, которая будет отправлена на почту со значениями, вводимых в поля */
$mail_to_myemail = "Hello the message was send from our site!
First Name: $first_name
Last Name: $last_name
Birthday: $birthday
Gender: $gender
Country: $country
E-mail: $email
Password: $password
Adress: $adress
Message content: $message";  
          
/* Отправка сообщения, с помощью функции mail() */
$headers = "From: $from \r\n";

if (mail($to, $mail_to_myemail, $headers . 'Content-type: text/plain; charset=utf-8'))
{ 
    echo "Thank you! " . $first_name . ", We will call you back.";
} else { 
    echo "Houston we have a problem"; 
}
}
?>
<!--Переадресация на главную страницу сайта, через 3 секунды-->
<script language="JavaScript" type="text/javascript">
function changeurl(){eval(self.location="/");}
window.setTimeout("changeurl();",3000);
</script>
