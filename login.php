<?php 
session_start();

// Database connection
$host = "localhost";
$user = "root"; // if you’re using a custom user, update this accordingly
$pass = "";
$dbname = "login_system";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error_message = '';

// When form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepared statement for table "signin" (where id is email, pass is password)
    $stmt = $conn->prepare("SELECT * FROM signin WHERE id = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // If user is found
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();

        // Compare plain text password (Note: For production, store hashed passwords)
        if ($password === $row['pass']) {
            $_SESSION['email'] = $email;

            // Remember Me functionality
            if (isset($_POST['remember'])) {
                setcookie('email', $email, time() + (86400 * 30), "/");
                setcookie('password', $password, time() + (86400 * 30), "/");
            } else {
                setcookie('email', "", time() - 3600, "/");
                setcookie('password', "", time() - 3600, "/");
            }

            header("Location: website.php");
            exit();
        } else {
            $error_message = "Invalid password.";
        }
    } else {
        $error_message = "Invalid email or password.";
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <!-- Display error message if any -->
    <?php if (!empty($error_message)): ?>
        <p style="color:red;"><?php echo $error_message; ?></p>
    <?php endif; ?>

    <form method="POST" action="">
        <label>Email:</label><br>
        <input type="text" name="email" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <label>
            <input type="checkbox" name="remember"> Remember Me
        </label><br><br>

        <button type="submit">Login</button>
    </form>
</body>
</html>
