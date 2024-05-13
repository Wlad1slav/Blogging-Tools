from models.model import Model


class PersonalInformation(Model):
    base = {
        'nickname': '',
        'description': '',
        'bio': '',
        'links': '',
    }
    table = 'personal_information'

    def generate_base_rows(self):
        if len(self.read_all()) == 0:
            for row in self.base:
                self.create_row(
                    {'key': row, 'value': self.base[row]}
                )


if __name__ == '__main__':
    personal_information = PersonalInformation()
    personal_information.generate_base_rows()
