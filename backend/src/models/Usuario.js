CREATE DATABASE lgc_db;config/database')
ryptjs')
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, bcrypt.genSalt(10)
    senha VARCHAR(100) NOT NULL,crypt.hash(usuario.senha, salt)
    cargo VARCHAR(50),
    departamento VARCHAR(50),  const query = `
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      INSERT INTO usuarios (nome, email, senha, cargo, departamento)
);, $4, $5)
email, cargo, departamento
CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(50) UNIQUE NOT NULL,
    orgao VARCHAR(100) NOT NULL,
    objeto TEXT NOT NULL,
    valor_global DECIMAL(15,2) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    tipo_reajuste VARCHAR(50),
    status VARCHAR(20) NOT NULL,  const { rows } = await db.query(query, values)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    return rows[0]
);

CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,OM usuarios WHERE email = $1'
    contrato_id INTEGER REFERENCES contratos(id),ry, [email])
    tipo VARCHAR(50) NOT NULL,
    dias_antecedencia INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documentos (    id SERIAL PRIMARY KEY,    contrato_id INTEGER REFERENCES contratos(id),    nome VARCHAR(100) NOT NULL,    tipo VARCHAR(50) NOT NULL,    caminho VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);