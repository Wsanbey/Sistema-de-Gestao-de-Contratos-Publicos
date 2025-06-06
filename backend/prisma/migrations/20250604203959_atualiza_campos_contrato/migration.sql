/*
  Warnings:

  - You are about to drop the column `atualizadoEm` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `dataFim` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `valorTotal` on the `Contrato` table. All the data in the column will be lost.
  - Added the required column `atualizado_em` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_termino` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objeto` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgao` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_reajuste` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_empenhado` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_global` to the `Contrato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "atualizadoEm",
DROP COLUMN "criadoEm",
DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
DROP COLUMN "descricao",
DROP COLUMN "titulo",
DROP COLUMN "valorTotal",
ADD COLUMN     "arquivo_contrato" TEXT,
ADD COLUMN     "arquivo_empenho" TEXT,
ADD COLUMN     "atualizado_em" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_termino" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "objeto" TEXT NOT NULL,
ADD COLUMN     "orgao" TEXT NOT NULL,
ADD COLUMN     "tipo_reajuste" TEXT NOT NULL,
ADD COLUMN     "valor_empenhado" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valor_global" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Ativo';
