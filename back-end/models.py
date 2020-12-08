from config import *


class Casa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quarto = db.Column(db.Integer)
    banheiro = db.Column(db.Integer)
    sala = db.Column(db.Integer)
    cozinha = db.Column(db.Integer)
    piscina = db.Column(db.String(128))

    def __str__(self):
        return f"{self.id}) {self.quarto}, {self.banheiro}, {self.sala}, {self.cozinha}, {self.piscina}"

    def json(self):
        return {
            "id": self.id,
            "quarto" : self.quarto,
            "banheiro" : self.banheiro,
            "sala" : self.sala,
            "cozinha" : self.cozinha,
            "piscina" : self.piscina,
        }

class Vendedor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cpf = db.Column(db.String(254))
    nome = db.Column(db.String(254))
    idade = db.Column(db.Integer)

    def __str__(self):
        return f"{self.id}) {self.cpf}, {self.nome}, {self.idade}"

    def json(self):
        return {
            "id": self.id,
            "cpf" : self.cpf,
            "nome" : self.nome,
            "idade" : self.idade,
        }

class Imobiliaria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cnpj = db.Column(db.String(254))
    cep = db.Column(db.String(128))

    casa = db.relationship("Casa")
    casa_id = db.Column(db.Integer, db.ForeignKey(Casa.id), nullable=False)

    vendedor = db.relationship("Vendedor")
    vendedor_id = db.Column(db.Integer, db.ForeignKey(Vendedor.id), nullable=False)

    def __str__(self):
        return f"{self.id}) {self.nome}, {self.cnpj}, {self.cep}, {self.casa_id}, {self.casa}, {self.vendedor_id}, {self.vendedor}"

    def json(self):
        return {
            "id": self.id,
            "nome" : self.nome,
            "cnpj" : self.cnpj,
            "cep" : self.cep,
            "casa_id" : self.casa_id,
            "casa" : self.casa.json(),
            "vendedor_id" : self.vendedor_id,
            "vendedor" : self.vendedor.json()
        }

if __name__ == "__main__":
    # database creation

    if os.path.exists(db_path):
        os.remove(db_path)
    db.create_all()

    c1 = Casa(quarto=3, banheiro=2, sala=1, cozinha=1, piscina="não")
    db.session.add(c1)

    v1 = Vendedor(nome="Maike", cpf="548.258.564-84", idade=20)
    db.session.add(v1)

    i1 = Imobiliaria(nome="VendeMais", cnpj="213-5", cep="115356-15", casa=c1, vendedor=v1)
    db.session.add(i1)

    db.session.commit()

    print(c1)
    print(c1.json())
    print('\n')
    print(v1)
    print(v1.json())
    print('\n')
    print(i1)
    print(i1.json())