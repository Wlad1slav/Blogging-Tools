from dotenv import load_dotenv
import os
import mysql.connector
from mysql.connector import Error


class Repository:
    def __init__(self):
        # Loading parameters for accessing the database
        load_dotenv()

        # Database connection
        self._connection = self._connect(os.getenv('DATABASE_HOST'),
                                         os.getenv('DATABASE_USER'),
                                         os.getenv('DATABASE_PASSWORD'),
                                         os.getenv('DATABASE_NAME'))

    def _connect(self, host, user, password, name):
        # A method for creating a database connection
        try:
            connection = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=name
            )

            if connection.is_connected():
                print("Connected to MySQL")
                return connection

        except Error as e:
            print("An error occurred while working with MySQL", e)
            return None

    def close_connection(self):
        # Closing the connection with database
        if self._connection.is_connected():
            self._connection.close()
            print("The connection to MySQL is closed")

    def request(self, query, parameters=None, edit=False):
        # The method makes a query to the database
        with self._connection.cursor() as cursor:
            cursor.execute(query, parameters)
            if edit:
                self._connection.commit()
            return cursor.fetchall() if not edit else None  # fetchall() only for SELECT queries


if __name__ == '__main__':
    repository = Repository()
    repository.close_connection()
