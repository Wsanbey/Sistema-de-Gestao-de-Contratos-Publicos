const db = require('../config/database')

class Contrato {
  static async listarTodos() {
    const query = `
      SELECT * FROM contratos 
      ORDER BY data_inicio DESC
    `
    const { rows } = await db.query(query)
    return rows
  }

  static async buscarPorId(id) {
    const query = `
      SELECT * FROM contratos 
      WHERE id = $1
    `
    const { rows } = await db.query(query, [id])
    return rows[0]
  }

  static async criar(contrato) {
    const query = `
      INSERT INTO contratos (
        numero, orgao, objeto, valor_global,
        data_inicio, data_fim, tipo_reajuste, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `
    const values = [
      contrato.numero,
      contrato.orgao,
      contrato.objeto,
      contrato.valorGlobal,
      contrato.dataInicio,
      contrato.dataFim,
      contrato.tipoReajuste,
      'Ativo'
    ]
    const { rows } = await db.query(query, values)
    return rows[0]
  }

  static async atualizar(id, contrato) {
    const query = `
      UPDATE contratos 
      SET numero = $1, orgao = $2, objeto = $3, 
          valor_global = $4, data_inicio = $5, 
          data_fim = $6, tipo_reajuste = $7, status = $8
      WHERE id = $9
      RETURNING *
    `
    const values = [
      contrato.numero,
      contrato.orgao,
      contrato.objeto,
      contrato.valorGlobal,
      contrato.dataInicio,
      contrato.dataFim,
      contrato.tipoReajuste,
      contrato.status,
      id
    ]
    const { rows } = await db.query(query, values)
    return rows[0]
  }
}

module.exports = Contrato

