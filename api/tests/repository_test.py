import unittest
from repository import Repository

"""
Tests for Repository class
Testing takes place in the database specified in the .env file
"""


class RepositoryTest(unittest.TestCase):
    def setUp(self):
        try:
            # Creating a test table if it does not exist
            self.repository = Repository()
            self.repository.request(
                'CREATE TABLE `test` (`id` INT NOT NULL AUTO_INCREMENT , `test_value` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;'
            )
        except:
            pass

    def test_connect(self):
        self.repository = Repository()

    def test_request_insert_query(self):
        # Test insert query
        self.repository.request(
            query='INSERT INTO test (test_value) VALUES (%s)',
            parameters=['test string'],
            edit=True
        )

    def test_get_all(self):
        # Test get all query
        response = self.repository.request('SELECT * FROM `test`')
        print(response)


if __name__ == '__main__':
    unittest.main()
