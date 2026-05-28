<?php 
session_start();

// Check if the user is logged in by verifying the session
if (!isset($_SESSION['email'])) {
  header("Location: login.php"); // Redirect to login if not logged in
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website</title>
</head>
<body>
  <h1>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?>!</h1> <!-- Sanitize the email -->
  <p>This is your main website page.</p>
  <a href="logout.php">Logout</a> <!-- Link to logout -->
</body>
</html>
