var vu =  new Vue({
    el: '#content',
    data: {
        panelName:'展开筛选',
        count: [],
        selectOne:'',
        adding: false,
        editing: false,
        maskshow: false,
        itmeMaskshow: false,
        saveMaskShow: false,
        banlaMaskShow: false,
        guigeSpan:"0", //控制点亮状态 -1为默认不点亮
        zhangtaiSpan:"0", //控制点亮状态
        columns1: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '名称',
                key: 'text',
                ellipsis: true,
            },
            {
                title: '连接',
                key: 'url',
                ellipsis: true
            },
            {
                title: '排序',
                key: 'orderIndex',
                ellipsis: true,
            },
            {
                title: '图标',
                key: 'icon',
                ellipsis: true
            },
            {
                title: '父菜单',
                key: 'parentId',
                ellipsis: true,
            },
        ],
        data1: [],
        selectData: [],
        tableHeight: '',
        sText: '',       //搜索名称
        aText: '',       //增加名称
        aUrl: '',        //增加连接
        aOrderIndex: '', //增加排序
        aIcon: '',       //增加图标
        parentId: '',   //增加-编辑-父级菜单ID
        aPermissionGroupCode: '',//增加权限组
        aMenuType: '',   //增加类型
        domainName: '', //增加-编辑-域名
        eid: '',         //编辑-id
        eText: '',       //编辑名称
        domainCodeList:[],//级别列表
        domainCode:'',//域名代码
        eUrl: '',        //编辑连接
        eOrderIndex: '', //编辑排序
        eIcon: '',       //编辑图标
        ePermissionGroupCode: '',//编辑权限组
        eaMenuType: '',   //编辑类型
        perList:[],//权限列表
        fMenuList:[],//菜单列表
        totalCount: 0,   //主界面-分页-总页数
        currentCount: 1, //主界面-分页-当前页
        pageIndex: 1, //主界面-分页-当前页
        pageSize: 10,    //每页条数
        pageSizeOpts: [100,50, 30, 20, 10], //分页配置
        ses:3,
    },
    created(){
        const p = {
            text: '',
        };
        const d = {
            params: {
                pageIndex: 1,
                pageSize: 10
            }
        };
        var that = this;
        that.saveMaskShow = true;
        that.$http.post('/pc/yqwl/menus/queryMenus', p, d).then((result) => {
            that.saveMaskShow = false;
            console.log(result.data);
            if (result.data.isSuccess) {
                that.data1 = result.data.data.datas;
                that.totalCount = result.data.data.total;
                if (result.data.data.length == 0){
                    that.tableHeight = '';
                    that.data1 = [];
                } else {
                    that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 55;
                }
            }else {
            }
        });
        that.$http.post('pc/api/v1/auth/getTokenAomain').then((result) => {
            console.log("token",result)
            if (result.data.isSuccess){
                this.tokenValue = result.data.resultMsg;
                if(result.data.resultMsg=='A'){
                    that.domainCodeList=[
                        {
                            value: 'A',
                            label: '总部'
                        },
                        {
                            value: 'B',
                            label: '省级代理'
                        },
                        {
                            value: 'C',
                            label: '市级代理'
                        },
                        {
                            value: 'D',
                            label: '区级代理'
                        },

                    ]
                }else if(result.data.resultMsg=='B'){
                    that.domainCodeList=[
                        {
                            value: 'B',
                            label: '省级代理'
                        },
                        {
                            value: 'C',
                            label: '市级代理'
                        },
                        {
                            value: 'D',
                            label: '区级代理'
                        },
                    ]
                }else if(result.data.resultMsg=='C'){
                    that.domainCodeList=[
                        {
                            value: 'C',
                            label: '市级代理'
                        },
                        {
                            value: 'D',
                            label: '区级代理'
                        },
                    ]

                }else if(result.data.resultMsg=='D'){
                    that.domainCodeList=[
                        {
                            value: 'D',
                            label: '区级代理'
                        },
                    ]
                }

            }
        });

    },
    methods: {
        //点击展开筛选
        panelChange:function() {
            if (this.panelName == '展开筛选') {
                this.panelName = '收起筛选'

            } else {
                this.panelName = '展开筛选';

            }
        },
        handleClose2 (event, name) {
            var that = this;
            const index = that.count.indexOf(name);

            if(name == "菜单名称"){
                that.sText = "";
            }
            that.count.splice(index, 1);
            that.queryMenu();
        },
        orderBy(column){

            var that = this;
            that.orderByon = column.order;

            if(column.key == 'parentId'){
                that.orderKey = 'parent_Id';
            }else if(column.key == 'orderIndex'){
                that.orderKey = 'order_Index';
            }
            else {
                that.orderKey = column.key;
            }

            that.queryMenu();
        },
        //选中行
        selectAction(sel){
            var that = this;
            that.selectData = sel;
        },
        //单击
        rowClick(row, index){
            var that = this;
            that.$Message.destroy();
            const msg = that.$Message.loading({
                content: ' 正在加载中...',
                duration: 0,
            });
            var selectData2 = [{
                domainName:row.domainName,
                icon:row.icon,
                id:row.id,
                domainCode:row.domainCode,
                permissionGroupCode:row.permissionGroupCode,
                orderIndex:row.orderIndex,
                parentId:row.parentId,
                remark:row.remark,
                text:row.text,
                url:row.url,
                _checked:true
            }];
            console.log(this.data1);
            for(var i=0,len=this.data1.length;i<len;i++){
                that.data1[i]['_checked'] = false;
                if(row.id === this.data1[i]['id'] ){
                    that.data1[i]['_checked'] = true;
                    that.selectData=selectData2;
                    that.editshow();
                }
            }
            setTimeout(function () {
                that.$Message.destroy();
            },1000)
        },
        //表格换色
        rowClassName(row, index){
            var that = this;
            for (var i = 0; i < that.selectData.length; i++){
                if (row.id == that.selectData[i].id){
                    return 'demo-table-info-row';
                }
            }
            return '';
        },
        //添加-显示
        addshow: function (){
            var that = this;
            that.editing=false;
            that.adding = true;
            that.maskshow = true;
            that.aText = '';
            that.aUrl = '';
            that.aOrderIndex = '';
            that.aIcon = '';
            that.parentId = '';
            that.per = '';
            that.perList = [];
            that.fMenuList = [];
            that.$http.post('/pc/yqwl/menus/selectMenusParentId').then((result) => {
                if (result.data.isSuccess) {
                    that.fMenuList = result.data.data;
                    that.fMenuList.splice(0, 0, {id: 0, text: '父级菜单'});
                }
            });
            that.$http.post('/pc/yqwl/menus/selectPer').then((result) => {
                if (result.data.isSuccess) {
                    that.perList = result.data.data;
                }
            });
            that.$http.post('pc/api/v1/auth/getTokenAomain').then((result) => {
                console.log("token",result)
                if (result.data.isSuccess){
                    this.tokenValue = result.data.resultMsg;
                    if(result.data.resultMsg=='A'){
                        that.domainCodeList=[
                            {
                                value: 'A',
                                label: '总部'
                            },
                            {
                                value: 'B',
                                label: '省级代理'
                            },
                            {
                                value: 'C',
                                label: '市级代理'
                            },
                            {
                                value: 'D',
                                label: '区级代理'
                            },

                        ]
                    }else if(result.data.resultMsg=='B'){
                        that.domainCodeList=[
                            {
                                value: 'B',
                                label: '省级代理'
                            },
                            {
                                value: 'C',
                                label: '市级代理'
                            },
                            {
                                value: 'D',
                                label: '区级代理'
                            },
                        ]
                    }else if(result.data.resultMsg=='C'){
                        that.domainCodeList=[
                            {
                                value: 'C',
                                label: '市级代理'
                            },
                            {
                                value: 'D',
                                label: '区级代理'
                            },
                        ]

                    }else if(result.data.resultMsg=='D'){
                        that.domainCodeList=[
                            {
                                value: 'D',
                                label: '区级代理'
                            },
                        ]
                    }

                }
            });

        },
        //增加关闭按钮
        addMenusClose() {
            var that = this;
            that.adding = false;
            that.maskshow = false;
            that.saveMaskshow = false;
        },
        //插入菜单方法
        addMenusSave() {
            var that = this;
            that.saveMaskshow = true;
            if (that.aOrderIndex == '') {
                that.$Message.error('菜单排序不能为空!');
                return "";
            }
            if (isNaN(that.aOrderIndex)) {
                that.$Message.error('菜单排序请输入number类型!');
                return "";
            }
            const p = {
                text: that.aText,
                domainCode:that.domainCode,
                url: that.aUrl,
                orderIndex: that.aOrderIndex,
                icon: that.aIcon,
                parentId: that.parentId,
                permissionGroupCode:that.per
            };
            that.$http.post('/pc/yqwl/menus/addMenus', p).then((result) => {
                if (result.data.isSuccess) {
                    that.adding = false;
                    that.maskshow = false;
                    that.saveMaskshow = false;
                    that.$Message.success('菜单添加成功!');
                    that.queryMenu();
                } else {
                    that.$Message.error(result.data.resultMsg);
                    that.saveMaskshow = false;
                }
            });

        },
        editshow: function () {
            var that = this;
            if (that.selectData.length <= 0) {
                that.editing = false;
                return "";
            } else if (that.selectData.length > 1) {
                that.$Message.error('只能选中一条数据');
                return "";
            } else {
                that.perList = [];
                that.fMenuList = [];
                that.parentId = "";
                that.per = "";
                domainCode:that.domainCode,
                that.banlaMaskShow = true ;
                that.$http.post('/pc/yqwl/menus/selectPer').then((result) => {
                    that.banlaMaskShow = false ;
                    if (result.data.isSuccess) {
                        that.perList = result.data.data;
                        that.parentId = that.selectData[0].parentId;
                    }
                });
                const p = {
                    params: {
                        id: that.selectData[0].id,
                    }
                };
                that.$http.get('/pc/yqwl/menus/selectMenusParentIdById', p).then((result) => {
                    if (result.data.isSuccess) {
                        that.fMenuList = result.data.data;
                        that.fMenuList.splice(0, 0, {id: 0, text: '父级菜单'});
                        that.per = that.selectData[0].permissionGroupCode;
                    }
                });
                that.editing = true;
                that.eid = that.selectData[0].id;
                that.eText = that.selectData[0].text;
                that.eUrl = that.selectData[0].url;
                that.eOrderIndex = that.selectData[0].orderIndex;
                that.eIcon = that.selectData[0].icon;
                that.domainCode = that.selectData[0].domainCode;
            }
        },
        //修改-关闭按钮
        editMenusClose(){
            var that = this;
            that.editing = false;
            that.maskshow = false;
            that.saveMaskshow = false;
        },
        //修改-菜单方法
        editMenusSave() {
            var that = this;
            if (that.eOrderIndex == '') {
                that.$Message.error('菜单排序不能为空!');
                return "";
            }
            if (isNaN(that.eOrderIndex)) {
                that.$Message.error('菜单排序请输入number类型!');
                return "";
            }
            const p = {
                id: that.eid,
                text: that.eText,
                url: that.eUrl,
                orderIndex: that.eOrderIndex,
                icon: that.eIcon,
                parentId: that.parentId,
                permissionGroupCode:that.per
            };
            that.saveMaskshow = true;
            that.$http.post('/pc/yqwl/menus/editMenus', p).then((result) => {
                that.saveMaskshow = false;
                if (result.data.isSuccess){
                    that.editMenusClose();
                    that.$Message.success('菜单修改成功!');
                    that.queryMenu();
                } else {
                    that.$Message.error(result.data.resultMsg);

                }
            });
        },
        //主界面-移除部门对话框
        delShow (){
            var that = this;
            this.$Modal.confirm({
                title: '<p style="margin-bottom: 15px;border-left: 3px solid #209cff;">&nbsp; 请确认</p>',
                content: '<p style="font-size: 16px;margin-top: -10px">确定要移除此菜单吗？</p>',
                onOk: () => {
                    that.deleteMenus();
                },
                onCancel: () => {
                }
            });

        },
        //编辑-移除
        delShowTwo(){
            var that = this;
            this.$Modal.confirm({
                title: '<p style="margin-bottom: 15px;border-left: 3px solid #209cff;">&nbsp; 请确认</p>',
                content: '<p style="font-size: 16px;margin-top: -10px">确定要移除此菜单吗？</p>',
                onOk: () => {
                    that.deleteMenusTwo();
                },
                onCancel: () => {
                }
            });
        },
        //删除菜单
        deleteMenus () {
            var that = this;
            const d = {params: {id: ''}};
            if (that.selectData.length <= 0) {
                that.$Message.error('请选择删除行');
            } else {
                for (var i = 0; i < that.selectData.length; i++) {
                    d.params.id += that.selectData[i].id + ",";
                }
                //在后台进行多行删除
                that.saveMaskShow = true;
                that.$http.get('/pc/yqwl/menus/deleteMenus', d).then((result) => {
                    that.saveMaskShow = false;
                    if (result.data.isSuccess) {
                        that.$Message.success('菜单删除成功!');
                        that.queryMenu();
                    }else {
                        that.$Message.error(result.data.resultMsg);
                    }
                });
            }
        },
        deleteMenusTwo(){
            var that = this;
            const d = {params: {id: that.eid}};
            //单行删除
            that.saveMaskShow = true;
            that.$http.get('/pc/yqwl/menus/deleteMenus', d).then((result) => {
                that.saveMaskShow = false;
                if (result.data.isSuccess) {
                    that.$Message.success('菜单删除成功!');
                    that.queryMenu();
                }else {
                    that.$Message.error(result.data.resultMsg);
                }
            });
        },
        //换页
        changeMenusPage(val){

            var that = this;
            that.pageIndex = val;
            that.queryMenu();
        },
        //分页长度
        pageSizeChang(val){
            var that = this;
            that.pageSize = val;

            that.queryMenu();
        },
        //查询信息方法
        queryMenu() {
            var that = this;
            that.count = [];
            if(that.sText != ""){
                var cont = {
                    'name':'菜单名称',
                    'count':that.sText,
                }
                that.count.push(cont);
            }
            that.selectData = [];
            const p = { text: that.sText};
            const d = {
                params: {
                    pageIndex: that.pageIndex,
                    pageSize: that.pageSize,
                    orderBy: that.orderKey,
                    orderType: that.orderByon
                }
            };
            that.saveMaskShow = true;
            that.$http.post('/pc/yqwl/menus/queryMenus', p, d).then((result) => {
                that.saveMaskShow = false;
                if (result.data.isSuccess) {
                    that.data1 = result.data.data.datas;
                    that.totalCount = result.data.data.total;
                    if (result.data.data.length == 0) {
                        that.tableHeight = '';
                    } else {
                        that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 55;
                    }
                } else {
                    that.data1 = [];
                    that.totalCount = 0;
                    that.pageIndex = 1;
                    that.tableHeight = '';
                }
            });
            that.editshow();
        },
        //重置
        resetMenu() {
            var that = this;
            that.sText = "";
            that.pageIndex = 1;
            that.pageSize = 10;
            that.orderKey = "";
            that.orderByon = "";
            that.queryMenu();
        },
        //导出
        download(){
            var that = this;
            const param = {text: that.sText};
            that.$http.get('/pc/yqwl/menus/menusdownload', {params: param}).then((result) => {
                window.location.href = "../yqwl/menus/menusdownload?text=" + that.sText+"&token="+localStorage.getItem('token');
                that.$Message.success("操作成功");
            });
        },
    },
})