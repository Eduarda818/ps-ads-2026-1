/*
Define as rotas e suas informações, servindo como fonte única
de verdade para AppRoutes.jsx e MainMenu.jsx
*/
import Homepage from '../pages/Homepage'
import LoginPage from '../pages/LoginPage'
import CustomersList from '../pages/customers/CustomersList'
import CarsList from '../pages/cars/CarsList'
import UsersList from '../pages/users/UsersList'
import UsersForm from '../pages/users/UsersForm'


/*
Os níveis de acesso de usuário são definidos como segue:
Nível 0 ~> sempre acessível, mesmo que não haja usuário autenticado
Nível 1 ~> acessível a qualquer usuário autenticado
Nível 2 ~> acessível apenas a usuários administradores
*/
const UserLevel = {
 ANY: 0,
 AUTHENTICATED: 1,
 ADMIN: 2
}


const routes = [
 {
   route: '/',
   description: 'Início',
   element: <Homepage />,
   userLevel: UserLevel.ANY,
   divider: true
 },
 {
   route: '/login',
   description: 'Entrar',
   element: <LoginPage />,
   userLevel: UserLevel.ANY,
   omitFromMainMenu: true
 },
 {
   route: '/customers',
   description: 'Listagem de clientes',
   element: <CustomersList />,
   userLevel: UserLevel.AUTHENTICATED
 },
 {
   route: '/cars',
   description: 'Listagem de veículos',
   element: <CarsList />,
   userLevel: UserLevel.AUTHENTICATED
 },
 {
   route: '/users',
   description: 'Listagem de usuários',
   element: <UsersList />,
   userLevel: UserLevel.ADMIN
 },
 {
   route: '/users/new',
   description: 'Cadastro de usuários',
   element: <UsersForm />,
   userLevel: UserLevel.ADMIN
 },
 {
   route: '/users/:id',
   description: 'Alterar usuário',
   element: <UsersForm />,
   userLevel: UserLevel.ADMIN,
   omitFromMainMenu: true
 },
]


export { routes, UserLevel }

