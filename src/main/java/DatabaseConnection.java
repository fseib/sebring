import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/sebring";
        String user = "postgres";
        String password = "admin";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("Connected to the PostgreSQL server successfully!");
            }
        } catch (SQLException e) {
            System.err.println("Database connection failure: " + e.getMessage());
        }
    }
}