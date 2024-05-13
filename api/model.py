from repository import Repository


class Model:
    def create_row(self, row):
        """
        A method for creating a new row
        :param row: A dictionary that must contain a column as a key and a value for that column as a key value.
        """
        repository = Repository()

        columns = ', '.join(f"`{key}`" for key in row.keys())

        # Create placeholders for values. The number of placeholders (%s) depends on the
        # length of the array of dictionary keys, which is specified as a row to be created
        placeholders = ', '.join(['%s'] * len(row))

        query = f'INSERT INTO `{self.table}` ({columns}) VALUES ({placeholders})'
        repository.request(
            query=query,
            parameters=list(row.values()),
            edit=True
        )
        repository.close_connection()

    def update_row(self, column, new_value, row_id=None, row_key=None):
        """
        A method for editing a string specified by a key or id
        :param column: The column in which you need to make changes
        :param new_value: New value for the column

        :param row_id: Id of the row to update the column
        (the key [:param row_key:] can serve as an alternative, if the primary key in the table is a string)

        :param row_key: Key of the row to update the column
        """
        repository = Repository()

        # If an ID was given to the method
        if row_id is not None:
            # Finding for a row by ID and updating it
            repository.request(
                query='UPDATE `{self.table}` SET `{column}` = %s WHERE `id` = %s',
                parameters=[new_value, row_id],
                edit=True
            )
        # If a KEY was given to the method
        elif row_key is not None:
            # Finding for a row by KEY and updating it
            repository.request(
                query=f'UPDATE `{self.table}` SET `{column}` = %s WHERE `key` = %s',
                parameters=[new_value, row_key],
                edit=True
            )
        # If ID and KEY wasn't given to the method
        else:
            # Closing the connection with the database (хз if its really necessary before the error)
            # and calling the error
            repository.close_connection()
            raise Exception('Please provide either row_id or row_key')

        repository.close_connection()

    def read_all(self):
        """
        Get all rows from a table
        :return: List of dictionaries containing all rows in the table
        """
        repository = Repository()
        result = repository.request(query=f'SELECT * FROM `{self.table}`')
        repository.close_connection()
        return result

    def delete_row(self, row_id=None, row_key=None):
        """
        Delete a row from the table

        :param row_id: Id of the row to delete the row
        (the key [:param row_key:] can serve as an alternative, if the primary key in the table is a string)

        :param row_key: Key of the row to delete the row
        """
        repository = Repository()

        # If an ID was given to the method
        if row_id is not None:
            # Deleting a row by ID
            repository.request(
                query=f'DELETE FROM `{self.table}` WHERE `id` = %s',
                parameters=[row_id],
                edit=True
            )
        # If a KEY was given to the method
        elif row_key is not None:
            # Deleting a row by KEY
            repository.request(
                query=f'DELETE FROM `{self.table}` WHERE `key` = %s',
                parameters=[row_key],
                edit=True
            )
        # If ID and KEY wasn't given to the method
        else:
            # Closing the connection with the database (хз if its really necessary before the error)
            # and calling the error
            repository.close_connection()
            raise Exception('Please provide either row_id or row_key')

        repository.close_connection()