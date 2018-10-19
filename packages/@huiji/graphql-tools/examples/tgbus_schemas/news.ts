// entry: https://news-graphql.xy.huijitrans.com/graphql
// timestamp: 2018-10-19T06:30:20.211Z
// ----------------------------------------------------------------

/**
 * 查询
 */
export interface Query {
  /**
   * 通过id查询games
   *
   * ```
   * function games(
   *   id?: Int,
   * ): ((gamesType | null)[] | null);
   * ```
   */
  games?: (gamesType | null)[] | null;

  /**
   * 通过groupName查询containerGroup中的内容
   *
   * ```
   * function groups(
   *   group_name?: string,
   * ): GroupType | null;
   * ```
   */
  groups?: GroupType | null;

  /**
   * 列表查询
   *
   * ```
   * function list(
   *   option?: Int,
   *   tags?: (string | null)[],
   *   website?: string,
   * ): listResType | null;
   * ```
   */
  list?: listResType | null;

  /**
   * 通过id查询news
   *
   * ```
   * function news(
   *   id?: Int,
   * ): ((newsType | null)[] | null);
   * ```
   */
  news?: (newsType | null)[] | null;

  /**
   * 搜索查询
   *
   * ```
   * function search(
   *   keyword?: string,
   *   website?: string,
   * ): listResType | null;
   * ```
   */
  search?: listResType | null;
}

/**
 * The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
 */
export type Int = number;

/**
 * container结构
 */
export interface ContainerType {
  /**
   * id
   */
  container_id?: string | null;

  /**
   * container名称
   */
  container_name?: string | null;

  /**
   * 是否包含内容
   */
  hasSource?: (sourceType | null)[] | null;
}

/**
 * group结构
 */
export interface GroupType {
  /**
   * container名称
   *
   * ```
   * function containers(
   *   container_id?: string,
   * ): ((ContainerType | null)[] | null);
   * ```
   */
  containers?: (ContainerType | null)[] | null;

  /**
   * id
   */
  status?: boolean | null;
}

/**
 * 锚点结构
 */
export interface achorType {
  /**
   * 名字
   */
  name?: string | null;

  /**
   * 标题
   */
  title?: string | null;
}

/**
 * 稿件目录结构
 */
export interface contentsType {
  /**
   * 锚点
   */
  achor?: (achorType | null)[] | null;

  /**
   * 页数
   */
  page?: Int | null;

  /**
   * 标题
   */
  title?: string | null;
}

/**
 * 游戏结构
 */
export interface gamesType {
  /**
   * 原版游戏/DLC/资料片等
   */
  category?: (string | null)[] | null;

  /**
   * 封面图
   */
  cover?: (imagesType | null)[] | null;

  /**
   * 索引
   */
  dbkey?: string | null;

  /**
   * 首发日期
   */
  first_release_date?: string | null;

  /**
   * 游戏引擎
   */
  game_engines?: (string | null)[] | null;

  /**
   * 游戏模式
   */
  game_modes?: (string | null)[] | null;

  /**
   * 游戏名称
   */
  game_name?: (string | null)[] | null;

  /**
   * 游戏状态
   */
  game_status?: string | null;

  /**
   * 品类
   */
  genres?: (string | null)[] | null;

  /**
   * 游戏名-多语言
   */
  names?: namesType | null;

  /**
   * 关联新闻
   */
  news?: (newsType | null)[] | null;

  /**
   * 游戏平台
   */
  platform?: (string | null)[] | null;

  /**
   * 玩家视角
   */
  player_perspectives?: (string | null)[] | null;

  /**
   * 截屏
   */
  screenshot_images?: (imagesType | null)[] | null;

  /**
   * 故事线
   */
  storyline?: string | null;

  /**
   * 简介
   */
  summary?: string | null;

  /**
   * 题材
   */
  themes?: (string | null)[] | null;

  /**
   * 链接
   */
  url?: string | null;
}

/**
 * 截图信息结构
 */
export interface imagesType {
  /**
   * 图片路径
   */
  img_path?: string | null;
}

/**
 * 列表查询结果
 */
export interface listResType {
  /**
   * 查询结果
   *
   * ```
   * function result(
   *   offset?: Int,
   *   start?: Int,
   * ): ((newsType | null)[] | null);
   * ```
   */
  result?: (newsType | null)[] | null;

  /**
   * 总数
   */
  total?: Int | null;
}

/**
 * 多语言姓名结构
 */
export interface namesType {
  /**
   * 英语名称
   */
  en_US?: string | null;

  /**
   * 中文名称
   */
  zh_CN?: string | null;
}

/**
 * 新闻结构
 */
export interface newsType {
  /**
   * 文章修改用户ID
   */
  adminid?: Int | null;

  /**
   * 文章作者
   */
  author?: (string | null)[] | null;

  /**
   * 作者id
   */
  authorid?: string | null;

  /**
   * 封面图
   */
  banner?: string | null;

  /**
   * 稿件链接
   */
  cms_url?: string | null;

  /**
   * 稿件合集名字
   */
  collection?: string | null;

  /**
   * 稿件合集序号
   */
  collectionindex?: string | null;

  /**
   * 稿件内容
   */
  contentraw?: string | null;

  /**
   * 稿件目录
   */
  contents?: (contentsType | null)[] | null;

  /**
   * 去掉html标签的文章内容
   */
  contenttext?: string | null;

  /**
   * 文章创建时间
   */
  ctime?: Int | null;

  /**
   * 摘要
   */
  description?: string | null;

  /**
   * 显示时间
   */
  displaydate?: Int | null;

  /**
   * 编辑者id
   */
  editorid?: Int | null;

  /**
   * 关联游戏ID
   */
  gameid?: string | null;

  /**
   * 关联游戏
   */
  games?: (gamesType | null)[] | null;

  /**
   * 关键词
   */
  keywords?: string | null;

  /**
   * 标记标签
   */
  labels?: string | null;

  /**
   * 跳转链接
   */
  locationlink?: string | null;

  /**
   * 文章ID
   */
  nid?: Int | null;

  /**
   * 推送时间
   */
  publishdate?: Int | null;

  /**
   * 推送到指定站点
   */
  pushto?: string | null;

  /**
   * 文章权重
   */
  rating?: string | null;

  /**
   * 相关新闻
   *
   * ```
   * function relatednews(
   *   website?: string,
   * ): ((newsType | null)[] | null);
   * ```
   */
  relatednews?: (newsType | null)[] | null;

  /**
   * 评测图
   */
  reviewbanner?: string | null;

  /**
   * 优缺点
   */
  reviewmaf?: reviewmafType | null;

  /**
   * 评测评分
   */
  reviewscore?: string | null;

  /**
   * 评测简评
   */
  reviewsummary?: string | null;

  /**
   * Kafka推送到es的时间
   */
  send_time?: string | null;

  /**
   * 来源描述
   */
  sourcedesc?: string | null;

  /**
   * 来源url
   */
  sourcelink?: string | null;

  /**
   * 新闻状态
   */
  status?: Int | null;

  /**
   * 资讯标签
   */
  tags?: (string | null)[] | null;

  /**
   * 完整标题
   */
  titlefull?: string | null;

  /**
   * 短标题
   */
  titleshort?: string | null;

  /**
   * 稿件类型ID
   */
  typeid?: Int | null;

  /**
   * 稿件类型名称
   */
  typename?: string | null;
}

/**
 * 优缺点结构
 */
export interface reviewmafType {
  /**
   * 默认
   */
  fault?: (string | null)[] | null;

  /**
   * good
   */
  good?: (string | null)[] | null;

  /**
   * status
   */
  status?: boolean | null;
}

/**
 * 新闻结构
 */
export interface sourceType {
  /**
   * 作者
   */
  author?: (string | null)[] | null;

  /**
   * 作者id
   */
  authorid?: string | null;

  /**
   * 发布日期
   */
  date?: Int | null;

  /**
   * 新闻id
   */
  id?: Int | null;

  /**
   * 跳转链接
   */
  locationlink?: string | null;

  /**
   * 图片地址
   */
  pic?: string | null;

  /**
   * 游戏平台
   */
  platform?: (string | null)[] | null;

  /**
   * 推送到指定站点
   */
  pushto?: string | null;

  /**
   * 评测分数
   */
  reviewscore?: string | null;

  /**
   * 简介
   */
  summary?: string | null;

  /**
   * 类别
   */
  tags?: (string | null)[] | null;

  /**
   * 标题
   */
  title?: string | null;

  /**
   * 英文标题
   */
  title_alt?: string | null;

  /**
   * 短标题
   */
  titleshort?: string | null;

  /**
   * 类别
   */
  type?: Int | null;

  /**
   * 文章类型名称
   */
  typename?: string | null;

  /**
   * 链接
   */
  url?: string | null;
}
