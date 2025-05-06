/**
 * @openapi
 * /cadastro-nutri:
 *   post:
 *     tags:
 *       - Sessão
 *     summary: Cadastro de nutricionista
 *     description: Cadastra um novo nutricionista no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nutricionista_nome
 *               - nutricionista_email
 *               - nutricionista_senha
 *               - nutricionista_cpf
 *             properties:
 *               nutricionista_nome:
 *                 type: string
 *              
 *               nutricionista_email:
 *                 type: string
 *                 format: email
 *               nutricionista_senha:
 *                 type: string
 *                 format: password
 *               nutricionista_cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nutricionista cadastrado com sucesso.
 *       400:
 *         description: Erro nos dados fornecidos.
 */

/**
 * @openapi
 * /login-nutri:
 *   post:
 *     tags:
 *       - Sessão
 *     summary: Login de nutricionista
 *     description: Autentica um nutricionista no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nutricionista_email
 *               - nutricionista_senha
 *             properties:
 *               nutricionista_email:
 *                 type: string
 *                 format: email
 *               nutricionista_senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */

/**
 * @openapi
 * /login-paciente:
 *   post:
 *     tags:
 *       - Sessão
 *     summary: Login de paciente
 *     description: Autentica um paciente no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *       401:
 *         description: Credenciais inválidas.
 */
