import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
const _studentGrades = db.studentGrades;

//#region CREATE NEW GRADE
const create = async (req, res) => {
  try {
    let studentGrades = req.body;
    studentGrades = new _studentGrades(studentGrades);
    await studentGrades.save();

    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(studentGrades)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

//#region FIND ALL GRADES
const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const studentGrades = await _studentGrades.find(condition);
    if (!studentGrades) {
      res.status(400).send({ message: 'sorry! dont have grades in database!' });
    }

    res.send(studentGrades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

//#region FIND TO GRADE TO ID
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const studentGrades = await _studentGrades.findOne({ _id: id });

    if (!studentGrades) {
      res.status(400).send({ message: 'sorry! dont have grades id use' + id });
    }

    res.send(studentGrades);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

//#region UPDATE TO ID
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const studentGrades = await _studentGrades.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (!studentGrades) {
      res.status(400).send({
        message: 'Student não localizado para atualizar!',
      });
    }
    res.send(studentGrades);

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

//#region REMOVE TO ID
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const studentGrades = await _studentGrades.findByIdAndDelete({
      _id: id,
    });

    if (!studentGrades) {
      res.status(400).send({
        message: 'Grade não identificado para exclusão!',
      });
    }
    res.send({ message: 'Excluido com sucesso!' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

//#region !WARNING - REMOVE ALL
const removeAll = async (req, res) => {
  try {
    const studentGrades = await _studentGrades.deleteMany({});
    res.send(studentGrades);
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};
//#endregion

export default { create, findAll, findOne, update, remove, removeAll };
