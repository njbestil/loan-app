<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <style>
        .signature {
            font-style: italic;
        }

        .noreply {
            margin-top: 200px;
            text-align: center;
        }

        .messages {
            margin: 30px 0;
        }
    </style>
</head>
<body>
<div>
    <p>Hello! We recieved your following inquiry :</p>
    <p>
        Name: {{ $name }}<br/>
        Email: {{ $email }}<br/>
        company: {{ $company }}<br/>
        type: {{ $type }}
    </p>
    <p class="messages">{{ $messages }}</p>

    <p>We will get back to you soon ! Keep in touch with us </p>
    <p>
        Regards,
    </p>
    <p class="noreply">This email was sent from <a href="#">noreply.loanapp@gmail.com</a>. You do not need to reply this email since this is auto generated.</p>
</div>
</body>
</html>