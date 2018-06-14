const menus = [
 
  {
    id: 'components',
    icon: 'fa fa-microchip',
    label: '论文处理',
    submenu: [
      {id: 'mypaper', name: 'p-mypaper', label: '我的论文'},
      {id: 'addpaper', name: 'addpaper', label: '登记论文'},
      {id: 'papertype', name: 'papertype', label: '论文类型'},
    ]
  },
  {
    id: 'pages',
    icon: 'fa fa-circle-o',
    label: '论文管理',
    submenu: [
      {id: 'p-data-table', name: 'p-data-table', label: '论文统计'},
      {id: 'log', name: 'log', label: '审核日志'},

      
      

    ]
  },

]
export default menus
