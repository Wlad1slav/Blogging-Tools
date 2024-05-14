from database.repository import Repository


class Migration:
    migrations = [
        # personal_information model
        'CREATE TABLE `personal_information` (`key` VARCHAR(255) NOT NULL , `value` TEXT NOT NULL , '
        'PRIMARY KEY (`key`)) ENGINE = InnoDB;',

        # post model
        'CREATE TABLE `posts` (`id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NULL DEFAULT NULL `text` TEXT '
        'NOT NULL , `images` JSON NULL DEFAULT NULL , `created_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = '
        'InnoDB;'
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
