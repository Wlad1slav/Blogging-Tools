from repository import Repository


class Migration:
    migrations = [
        # personal_information model
        'CREATE TABLE `personal_information` (`key` VARCHAR(255) NOT NULL , `value` TEXT NOT NULL , '
        'PRIMARY KEY (`key`)) ENGINE = InnoDB;',
    ]

    def migrate(self):
        repository = Repository()
        for migration in self.migrations:
            try:
                repository.request(migration)
                print('Table migrated successfully.')
            except Exception as e:
                print('Error during table migration', e)

        repository.close_connection()


if __name__ == '__main__':
    migration = Migration()
    migration.migrate()
