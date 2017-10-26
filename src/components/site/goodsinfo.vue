<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">        
       <!-- 导航栏 -->
    <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/site/goodslist">首页</a> &gt;
            <a href="/goods.html">购物商城</a>
            <a href="/goods/42/1.html">商品详情</a>
        </div>
    </div>
    <!-- 商品详情 -->
    <div class="section" v-if="info.goodsinfo">
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <!--页面左边-->
                <div class="left-925">
                    <div class="goods-box clearfix">
                        <!--商品图片-->
                        <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                        <div class="magnifier-container">
                            <div class="images-cover"></div>
                            <!--当前图片显示容器-->
                            <div class="move-view"></div>
                            <!--跟随鼠标移动的盒子-->
                            </div>
                            <div class="magnifier-assembly">
                            <div class="magnifier-btn">
                                    <span class="magnifier-btn-left">&lt;</span>
                                    <span class="magnifier-btn-right">&gt;</span>
                                </div>
                                <!--按钮组-->
                                <div class="magnifier-line">
                                    <ul class="clearfix animation03">
                                        <li v-for="item in info.imglist" :key="item.id">
                                            <div class="small-img">
                                                <img :src="item.original_path" />
                                            </div>
                                        </li>                                    
                                    </ul>
                                </div>
                                <!--缩略图-->
                            </div>
                            <div class="magnifier-view"></div>
                            <!--经过放大的图片显示容器-->
                        </div>         
                        </div>
                        <!--/商品图片-->
                        <!--商品信息-->
                        <div class="goods-spec">
                            <h1 v-text="info.goodsinfo.title"></h1>
                            <p class="subtitle" v-text="info.goodsinfo.sub_title"></p>
                            <div class="spec-box">
                                <dl>
                                    <dt>货号</dt>
                                    <dd id="commodityGoodsNo" v-text="info.goodsinfo.goods_no"></dd>
                                </dl>
                                <dl>
                                    <dt>市场价</dt>
                                    <dd>
                                        <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>销售价</dt>
                                    <dd>
                                        <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                                    </dd>
                                </dl>
                            </div>
                            <div class="spec-box">
                                <dl>
                                    <dt>购买数量</dt>
                                    <dd>
                                        <div class="stock-box">
                                            <el-input-number v-model="buycount" :min="1"></el-input-number>
                                        </div>
                                        <span class="stock-txt">库存<em id="commodityStockNum">10</em>件</span>
                                    </dd>
                                </dl>
                                <dl>
                                    <dd>
                                        <div class="btn-buy" id="buyButton">
                                            <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                            <button class="add" @click='addcar'>加入购物车</button>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <!--/商品信息-->
                    </div>
                    <div id="goodsTabs" class="goods-tab bg-wrap">
                        <!--选项卡-->
                        <Affix>
                        <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                            <ul>
                                <li>
                                    <a v-bind="{class:isContent?'selected':''}" href="javascript:;" @click="changeIsContent(true)">商品介绍</a>
                                </li>
                                <li>
                                    <a v-bind="{class:!isContent?'selected':''}" href="javascript:;" @click="changeIsContent(false)">商品评论</a>
                                </li>
                            </ul>
                        </div>
                        </Affix>
                        <!--/选项卡-->
                        <!--选项内容-->
                        <div class="tab-content entry" v-if='isContent' >
                           <span v-html="info.goodsinfo.content"></span>
                        </div>
                        <div class="tab-content" v-if="!isContent">
                            <!--网友评论-->
                            <div class="comment-box">
                                <!--取得评论总数-->
                                <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                    <div class="avatar-box">
                                        <i class="iconfont icon-user-full"></i>
                                    </div>
                                    <div class="conn-box">
                                        <div class="editor">
                                            <textarea id="txtContent" name="txtContent" v-model="txtContent" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                            <span class="Validform_checktip"></span></div>
                                        <div class="subcon">
                                            <input type="button" @click='postContent' value="提交评论" class="submit">
                                            <span class="Validform_checktip"></span></div>
                                    </div>
                                </form>
                                <ul id="commentList" class="list-box">
                                    <p v-if='ContentList.length<0' style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                    <li v-for="item in ContentList" :key="item.id">
                                        <div class="avatar-box"><i class="iconfont icon-user-full"></i></div>
                                        <div class="inner-box">
                                            <div class="info">
                                                <span v-text='item.user_name'></span>
                                                <span>{{item.add_time |datefmt('YYYY-MM-DD HH:mm:ss')}}</span></div>
                                            <p v-text='item.content'></p>
                                        </div>
                                    </li>
                                </ul>
                                <!--放置页码-->
                                <div class="page-box" style="margin:5px 0 0 62px">
                                        <el-pagination
                                        @size-change="PageSize"
                                        @current-change="PageIndex"
                                        :current-page="pageIndex"
                                        :page-sizes="[5, 10, 15, 20]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalC">
                                      </el-pagination>
                                </div>
                                <!--/放置页码-->
                            </div>
                            <!--/网友评论-->
                        </div>
                    </div>
                </div>
                <!--/页面左边-->
                <!--页面右边-->
                <div class="left-220">
                    <div class="bg-wrap nobg">
                        <div class="sidebar-box">
                            <h4>推荐商品</h4>
                            <ul class="side-img-list">
                                <li v-for="item in info.hotgoodslist" :key="item.id">
                                    <div class="img-box">
                                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                            <img :src="item.img_url">
                                        </router-link>
                                    </div>
                                    <div class="txt-box">
                                       <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                           {{item.title}}
                                        </router-link>
                                        <span>{{item.add_time |datefmt("YYYY-MM-DD HH:mm:ss")}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--/页面右边-->
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    //导入固定评论栏
    import Affix from 'iview/src/components/affix/'

    //导入vm
    import {
        vm,
        key
    } from '../../kits/vm.js'

    //导入轮播图js代码
    import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';

    // es6的export default{ 写法等同于 module.exports={
    export default {
        components: {
            Affix
        },
        // es6的写法 data() 等同于es5的 data:function()
        data() {
            return {
                buycount: 1,
                //控制商品详情和评论两个的li标签的颜色
                isContent: true,
                info: {},
                totalC: 0,
                pageSize: 10,
                pageIndex: 1,
                //服务器返回评论数据的储存器
                ContentList: [],
                txtContent: ''
            }
        },
        watch: {
            '$route': function() {
                this.getginfo()
            }
        },
        created() {
            this.getginfo()
            this.getContent();
        },
        methods: {
            //用户点击加入购物车的时候触发的方法
            addcar() {
                //1.0通过导入vm对象 的跨组件通讯 , 在2.0中使用vuex来实现
                //触发事件
                // vm.$emit(key, this.buycount)
                //2.0使用vuex
                this.$store.dispatch('changeBuycount', this.buycount)
            },
            //提交评论
            postContent() {
                // 首先判断文本框中有没有值,
                // 如果没有提醒用户输入
                if (this.txtContent.length <= 0) {
                    this.$message.error('评论为空不能评论');
                    return;
                }
                var goodsid = this.$route.params.goodsid;
                this.$http.post('/site/validate/comment/post/goods/' + goodsid, "commenttxt=" + this.txtContent)
                    .then(res => {
                        if (res.data.status == 1) {
                            alert(res.data.message)
                        }

                        alert('评论成功')

                        //评论成功后把文本框内容清除
                        this.txtContent = ''
                        this.getContent()
                    })
            },
            //用户点击分页页码的时候触发
            PageSize(val) {
                this.pageSize = val;

                //重新获取数据.
                this.getContent();
            },
            //用户当前页数在第几页
            PageIndex(val) {
                //val代表当前用户选择的页数
                this.pageIndex = val;

                //重新获取数据
                this.getContent();
            },
            //分页获取当前商品的评论数据
            getContent() {
                //获取id
                var goodsid = this.$route.params.goodsid;
                this.$http.get('/site/comment/getbypage/goods/' + goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)
                    .then(res => {
                        if (res.data.status == 1) {
                            alert(res.data.message)
                        }
                        //商品评论数据赋值
                        this.ContentList = res.data.message

                        //商品赋值完让总条数也赋值.
                        this.totalC = res.data.totalcount;
                    })
            },
            //控制tab的切换,
            changeIsContent(iscontent) {
                this.isContent = iscontent
            },
            getginfo() {
                //获取需要拼接的id
                var goodsid = this.$route.params.goodsid;
                //请求
                this.$http.get('/site/goods/getgoodsinfo/' + goodsid)
                    .then(res => {
                        if (res.data.status == 1) {
                            alert(res.data.message)
                        }
                        this.info = res.data.message;
                        setTimeout(function() {
                            $('#magnifier1').imgzoon({
                                magnifier: '#magnifier1'
                            });
                        }, 300);
                    })
            }
        }
    }
</script>

<style>
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>