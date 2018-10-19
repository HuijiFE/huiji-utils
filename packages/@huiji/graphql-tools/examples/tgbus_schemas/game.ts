// entry: https://graphql.xy.huijitrans.com/graphql
// timestamp: 2018-10-19T06:30:15.410Z
// ----------------------------------------------------------------

export interface query {
  /**
   * ```
   * function collection(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  collection?: collection | null;

  /**
   * ```
   * function collections(
   *   // limit
   *   first?: Int,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  collections?: (collection | null)[] | null;

  /**
   * count_type
   */
  count?: counttype | null;

  /**
   * 开发方
   *
   * ```
   * function developer(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  developer?: collection | null;

  /**
   * 开发方
   *
   * ```
   * function developers(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  developers?: (collection | null)[] | null;

  /**
   * 搜索
   *
   * ```
   * function esearch(
   *   // 筛选条件
   *   filters?: filter,
   *   // limit
   *   first?: Int,
   *   // query keywords
   *   query?: string,
   *   // offset
   *   skip?: Int,
   *   // GAME
   *   type?: itemType,
   * ): essearch | null;
   * ```
   */
  esearch?: essearch | null;

  /**
   * 搜索输入提示
   *
   * ```
   * function essearch_prompt(
   *   query?: string,
   * ): inputprompt | null;
   * ```
   */
  essearch_prompt?: inputprompt | null;

  /**
   * 世界观
   *
   * ```
   * function franchise(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  franchise?: collection | null;

  /**
   * ```
   * function franchises(
   *   // limit
   *   first?: Int,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  franchises?: (collection | null)[] | null;

  /**
   * 游戏
   *
   * ```
   * function game(
   *   // id
   *   id?: Int,
   * ): game | null;
   * ```
   */
  game?: game | null;

  /**
   * 引擎
   *
   * ```
   * function game_engine(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  game_engine?: collection | null;

  /**
   * 引擎集合
   *
   * ```
   * function game_engines(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  game_engines?: (collection | null)[] | null;

  /**
   * 游戏列表
   *
   * ```
   * function game_list(
   *   // id集合
   *   ids?: (Int | null)[],
   * ): ((game | null)[] | null);
   * ```
   */
  game_list?: (game | null)[] | null;

  /**
   * 游戏模式
   *
   * ```
   * function game_mode(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  game_mode?: collection | null;

  /**
   * 游戏模式集合
   *
   * ```
   * function game_modes(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  game_modes?: (collection | null)[] | null;

  /**
   * 游戏集合
   *
   * ```
   * function games(
   *   // begin_time
   *   begin_time?: Int,
   *   // end_time
   *   end_time?: Int,
   *   // 筛选条件
   *   filters?: gamesFilter,
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((game | null)[] | null);
   * ```
   */
  games?: (game | null)[] | null;

  /**
   * 品类
   *
   * ```
   * function genre(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  genre?: collection | null;

  /**
   * 品类集合
   *
   * ```
   * function genres(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  genres?: (collection | null)[] | null;

  /**
   * ```
   * function keyword(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  keyword?: collection | null;

  /**
   * ```
   * function keywords(
   *   // limit
   *   first?: Int,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  keywords?: (collection | null)[] | null;

  /**
   * 游戏平台
   *
   * ```
   * function platform(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  platform?: collection | null;

  /**
   * 平台集合
   *
   * ```
   * function platforms(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  platforms?: (collection | null)[] | null;

  /**
   * 视角
   *
   * ```
   * function player_perspective(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  player_perspective?: collection | null;

  /**
   * 视角集合
   *
   * ```
   * function player_perspectives(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  player_perspectives?: (collection | null)[] | null;

  /**
   * 不同地区的发行方
   *
   * ```
   * function publisher(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  publisher?: collection | null;

  /**
   * 发布集合
   *
   * ```
   * function publishers(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  publishers?: (collection | null)[] | null;

  /**
   * 评分面板
   *
   * ```
   * function score_leaderboards(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   *   store?: string,
   * ): ((game | null)[] | null);
   * ```
   */
  score_leaderboards?: (game | null)[] | null;

  /**
   * 搜索（已废弃）
   *
   * ```
   * function search(
   *   // 筛选条件
   *   filters?: filter,
   *   // limit
   *   first?: Int,
   *   // query keywords
   *   query?: string,
   *   // offset
   *   skip?: Int,
   *   // GAME
   *   type?: itemType,
   * ): ((game | null)[] | null);
   * ```
   */
  search?: (game | null)[] | null;

  /**
   * 片段集合
   */
  sections?: (section | null)[] | null;

  /**
   * 题材
   *
   * ```
   * function theme(
   *   id?: Int,
   * ): collection | null;
   * ```
   */
  theme?: collection | null;

  /**
   * 题材集合
   *
   * ```
   * function themes(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((collection | null)[] | null);
   * ```
   */
  themes?: (collection | null)[] | null;
}

/**
 * The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point).
 */
export type Float = number;

/**
 * The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
 */
export type Int = number;

export interface GamePromptStruct {
  /**
   * 游戏id
   */
  id?: Int | null;

  /**
   * 游戏名称
   */
  name?: string | null;
}

export interface article {
  /**
   * 数据所属类型
   */
  article_genre?: string | null;

  /**
   * 点击数（阅读数）
   */
  click_count?: Int | null;

  /**
   * 评论数量
   */
  comment_count?: Int | null;

  dbkey?: string | null;

  dbkey_all?: (dbkeyAll | null)[] | null;

  /**
   * 文章摘要 ; string type
   */
  desc?: string | null;

  /**
   * 微博内的图片（不含表情）
   */
  img_location?: (imglocation | null)[] | null;

  /**
   * 文章大图个数
   */
  img_location_count?: Int | null;

  /**
   * 点赞数
   */
  like_count?: Int | null;

  /**
   * news nid
   */
  nid?: Int | null;

  /**
   * html格式的正文（爬虫解析后的）
   */
  parsed_content?: string | null;

  /**
   * 按照规定格式解析出的文章纯文本个数 ; int type
   */
  parsed_content_char_count?: Int | null;

  /**
   * 按照规定格式解析出的文章纯文本
   */
  parsed_content_main_body?: string | null;

  /**
   * 发布时间（string type）
   */
  publish_time?: Int | null;

  /**
   * 跳转
   */
  referer?: article | null;

  /**
   * 转发量
   */
  repost_count?: Int | null;

  /**
   * 抓取地址响应url str（真实可用地址)
   */
  response_url?: string | null;

  /**
   * 文章小图
   */
  small_img_location?: (imglocation | null)[] | null;

  /**
   * 文章小图个数（int type)
   */
  small_img_location_count?: Int | null;

  /**
   * 文章关键词标签 ; list type
   */
  tags?: (string | null)[] | null;

  /**
   * 爬虫爬取的时间
   */
  timestamp?: string | null;

  /**
   * 文章标题
   */
  title?: string | null;

  /**
   * 最新页面更新时间
   */
  update_time?: Int | null;

  /**
   * 唯一爬取url， 爬虫真实爬取时详情页url（微信特殊)
   */
  url?: string | null;

  /**
   * 用户
   */
  user?: (user | null)[] | null;

  /**
   * 用户头像图片
   */
  user_img_location?: (imglocation | null)[] | null;

  /**
   * 微博内的视频封面图
   */
  video_img_location?: (imglocation | null)[] | null;

  /**
   * 微博内的视频封面图个数
   */
  video_img_location_count?: Int | null;

  /**
   * 微博内包含的视频
   */
  video_location?: (videolocation | null)[] | null;

  /**
   * 视频总计数
   */
  video_location_count?: Int | null;
}

export interface collection {
  /**
   * 发布时间
   */
  begin_time?: string | null;

  /**
   * 背景图集合
   */
  bg_cover?: (collectionCover | null)[] | null;

  /**
   * 公司类型
   */
  business_entity?: (string | null)[] | null;

  /**
   * 从事业务
   */
  business_nature?: (string | null)[] | null;

  /**
   * 关闭时间
   */
  company_end?: string | null;

  /**
   * 母公司
   */
  company_parent?: (collection | null)[] | null;

  /**
   * 标语
   */
  company_slogan?: string | null;

  /**
   * 创立时间
   */
  company_start?: string | null;

  /**
   * 正文
   */
  content_text?: string | null;

  /**
   * 数量
   */
  count?: Int | null;

  /**
   * 图片info
   */
  cover?: collectionCover | null;

  /**
   * engine开发公司
   */
  created_company?: (collection | null)[] | null;

  /**
   * 列在左侧的详细描述
   */
  description?: string | null;

  /**
   * platform开发公司
   */
  developed_company?: (collection | null)[] | null;

  /**
   * 子引擎
   */
  engine_child?: (string | null)[] | null;

  /**
   * 引擎功能
   */
  engine_function?: (string | null)[] | null;

  /**
   * ```
   * function games(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((game | null)[] | null);
   * ```
   */
  games?: (game | null)[] | null;

  genre_namespace?: string | null;

  /**
   * 总部所在城市
   */
  headquarter_city?: string | null;

  /**
   * 总部所在城区
   */
  headquarter_district?: string | null;

  /**
   * 总部所在国家
   */
  headquarter_nation?: string | null;

  /**
   * 总部所在大区
   */
  headquarter_region?: string | null;

  id?: Int | null;

  /**
   * 外部链接
   */
  links?: (link | null)[] | null;

  /**
   * logo图集合
   */
  logo_cover?: (collectionCover | null)[] | null;

  /**
   * 代表作，列在左侧.
   */
  main_games?: (game | null)[] | null;

  /**
   * 名称
   */
  name?: string | null;

  /**
   * 名称集合
   */
  names?: names | null;

  /**
   * 所有权
   */
  owned_company?: (collection | null)[] | null;

  /**
   * game站pageid
   */
  page_id?: Int | null;

  /**
   * game站pagename
   */
  page_name?: string | null;

  /**
   * igdb的slug，沿用保留
   */
  platform_slug?: string | null;

  /**
   * 编程语言
   */
  programme_language?: (string | null)[] | null;

  /**
   * 对应的genre的id
   */
  redirect_genre?: string | null;

  /**
   * 相关namespace 在themes、game_modes、player_perspectives中选一个
   */
  related_ns?: string | null;

  /**
   * 相关namespace具体id
   */
  related_ns_id?: string | null;

  /**
   * 详细介绍，为简介的展开结果
   */
  storyline?: string | null;

  /**
   * 简述
   */
  summary?: string | null;

  /**
   * 官网
   */
  website?: string | null;

  /**
   * 权重 1-5
   */
  weight?: Int | null;

  /**
   * 在huijiwiki.com上的对应站点前缀，默认值为game
   */
  wiki_pre?: string | null;
}

export interface collectionCover {
  /**
   * 封面类型 1:默认封面 2:备用封面
   */
  cover_type?: string | null;

  /**
   * 图片描述
   */
  desc?: string | null;

  /**
   * 图片格式
   */
  format?: string | null;

  /**
   * 图片高
   */
  height?: Int | null;

  /**
   * 图片序列号
   */
  index?: string | null;

  is_deleted?: Int | null;

  /**
   * 图片路径
   */
  path?: string | null;

  /**
   * 图片大小
   */
  size?: Int | null;

  /**
   * 图片原始url
   */
  src?: string | null;

  /**
   * 图片类型
   */
  type?: string | null;

  /**
   * 图片宽
   */
  width?: Int | null;
}

export interface counttype {
  /**
   * 公司收录数
   */
  companies?: Int | null;

  /**
   * 游戏收录数
   */
  games?: Int | null;
}

export interface cover {
  /**
   * 图片描述
   */
  desc?: string | null;

  /**
   * 图片格式
   */
  format?: string | null;

  /**
   * 图片高
   */
  height?: string | null;

  /**
   * 图片序列号
   */
  index?: string | null;

  /**
   * 图片路径
   */
  path?: string | null;

  /**
   * 图片大小
   */
  size?: Int | null;

  /**
   * 图片原始url
   */
  src?: string | null;

  /**
   * 图片类型
   */
  type?: string | null;

  /**
   * 图片宽
   */
  width?: string | null;
}

export interface date {
  /**
   * 日期
   */
  date?: Int | null;

  /**
   * 平台
   */
  platform?: collection | null;

  /**
   * 地区
   */
  region?: string | null;
}

export interface dbkeyAll {
  /**
   * 游戏名
   */
  game?: string | null;

  /**
   * dbkey
   */
  id?: Int | null;
}

/**
 * Sorting direciton
 */
export enum direction {
  /**
   * 升序
   */
  ASC = 'ASC',

  /**
   * 降序
   */
  DESC = 'DESC',
}

export interface esgames {
  /**
   * 游戏
   */
  game?: game | null;

  /**
   * 高亮
   */
  highlight?: highlight | null;

  /**
   * 评分
   */
  score?: Float | null;
}

export interface essearch {
  /**
   * 结果
   */
  gameresults?: (esgames | null)[] | null;

  /**
   * 最大评分
   */
  max_score?: Float | null;

  /**
   * 总数
   */
  total?: Int | null;
}

export interface filter {
  /**
   * 页面类型  1：游戏本体  2：DLC  3：资料片  4：独立资料片
   *
   * @default -1
   */
  category?: Int;

  /**
   * 引擎
   *
   * @default -1
   */
  game_engines?: Int;

  /**
   * 游戏模式
   *
   * @default -1
   */
  game_modes?: Int;

  /**
   * 品类
   *
   * @default -1
   */
  genres?: Int;

  /**
   * 游戏平台
   *
   * @default -1
   */
  platform?: Int;

  /**
   * 视角
   *
   * @default -1
   */
  player_perspectives?: Int;

  /**
   * 游戏题材
   *
   * @default -1
   */
  themes?: Int;
}

export interface game {
  /**
   * 音频语言
   */
  audio_lang?: string | null;

  avatars?: (game | null)[] | null;

  bundles?: (game | null)[] | null;

  buy_in_app?: string | null;

  /**
   * 页面类型  1：游戏本体  2：DLC  3：资料片  4：独立资料片
   */
  category?: Int | null;

  /**
   * 页面类型名
   */
  category_name?: string | null;

  /**
   * 聚合页
   */
  collections?: (collection | null)[] | null;

  /**
   * 图片集合
   */
  covers?: (cover | null)[] | null;

  /**
   * 开发商
   */
  developers?: (collection | null)[] | null;

  dlcs?: (game | null)[] | null;

  expansions?: (game | null)[] | null;

  external_links?: (links | null)[] | null;

  features?: (string | null)[] | null;

  /**
   * 首发日期
   */
  first_release_date?: Int | null;

  /**
   * 世界观
   */
  franchises?: (collection | null)[] | null;

  game?: (game | null)[] | null;

  /**
   * 引擎
   */
  game_engines?: (collection | null)[] | null;

  /**
   * 游戏模式
   */
  game_modes?: (collection | null)[] | null;

  /**
   * 1: 正常：未删除可搜索	0: 隐藏：不可搜索，未删除 -1: 屏蔽：已删除，不可搜索
   */
  game_status?: string | null;

  games?: (game | null)[] | null;

  /**
   * 游戏类型
   */
  genres?: (collection | null)[] | null;

  id?: Int | null;

  /**
   * 界面语言
   */
  interface_lang?: string | null;

  /**
   * igdb额外字段
   */
  keywords?: (collection | null)[] | null;

  /**
   * 名称
   */
  name?: string | null;

  /**
   * 名称集合
   */
  names?: (name | null)[] | null;

  /**
   * 资讯
   *
   * ```
   * function news(
   *   // limit
   *   first?: Int,
   *   // sort
   *   orderBy?: orderBy,
   *   // offset
   *   skip?: Int,
   * ): ((article | null)[] | null);
   * ```
   */
  news?: (article | null)[] | null;

  /**
   * 游戏平台
   */
  platforms?: (collection | null)[] | null;

  /**
   * 视角
   */
  player_perspectives?: (collection | null)[] | null;

  /**
   * 价格
   *
   * ```
   * function prices(
   *   // 起始时间
   *   dateFrom?: Int,
   *   // 截止时间
   *   dateTo?: Int,
   *   // one or more of "eshop_us", "indienova",
   *   // "pss_cn_zhs", "pss_hk_zhs", "pss_hk_zht",
   *   // "pss_jp", "pss_us","steam_cn", "xbox_cn",
   *   // "xbox_hk", "xbox_tw","xbox_us"
   *   stores?: (string | null)[],
   *   // 1 - original price
   *   // 2 - discounted price
   *   // 3 - member exclusive price
   *   // 4 - member exclusive price with discount
   *   types?: (Int | null)[],
   * ): ((price | null)[] | null);
   * ```
   */
  prices?: (price | null)[] | null;

  /**
   * 不同地区的发行方
   */
  publishers?: (publishers | null)[] | null;

  ratings?: (rating | null)[] | null;

  /**
   * 重复游戏重定向id
   */
  redirect_id?: Int | null;

  /**
   * 各个地区的发布日期
   */
  release_dates?: (date | null)[] | null;

  /**
   * 评分
   *
   * ```
   * function scores(
   *   // 起始时间
   *   dateFrom?: Int,
   *   // 截止时间
   *   dateTo?: Int,
   *   // one or more of "eshop_us", "indienova",
   *   // "pss_cn_zhs", "pss_hk_zhs", "pss_hk_zht", "pss_jp", "pss_us",
   *   // "steam_cn", "xbox_cn","xbox_hk", "xbox_tw",
   *   // "xbox_us"
   *   stores?: (string | null)[],
   * ): ((score | null)[] | null);
   * ```
   */
  scores?: (score | null)[] | null;

  /**
   * 截屏
   */
  screenshots?: (screenshots | null)[] | null;

  /**
   * 片段集合
   */
  sections?: (section | null)[] | null;

  /**
   * ps额外字段
   */
  size?: string | null;

  standalone_expansions?: (game | null)[] | null;

  /**
   * 完整描述html
   */
  storyline_html?: string | null;

  /**
   * 完整描述
   */
  storyline_text?: string | null;

  /**
   * 字母语言
   */
  subtitle_lang?: string | null;

  /**
   * 简介html
   */
  summary_html?: string | null;

  /**
   * 简介
   */
  summary_text?: string | null;

  /**
   * 系统需求html，暂缓
   */
  system_requirements_html?: string | null;

  /**
   * 系统需求，暂缓
   */
  system_requirements_text?: string | null;

  system_themes?: (game | null)[] | null;

  /**
   * 游戏题材
   */
  themes?: (collection | null)[] | null;

  /**
   * 编辑更新时间
   */
  updated_at?: Int | null;

  videos?: (videos | null)[] | null;

  /**
   * 微博
   *
   * ```
   * function weibos(
   *   // limit
   *   first?: Int,
   *   // offset
   *   skip?: Int,
   * ): ((article | null)[] | null);
   * ```
   */
  weibos?: (article | null)[] | null;

  /**
   * 游戏权重
   */
  weight?: Int | null;
}

export interface gamesFilter {
  /**
   * 品类集合
   *
   * @default ""
   */
  genres?: string;

  /**
   * 语言
   *
   * @default ""
   */
  interface_lang?: string;

  /**
   * 游戏平台集合
   *
   * @default ""
   */
  platform?: string;
}

export interface highlight {
  /**
   * 游戏名
   */
  game_name?: (string | null)[] | null;
}

export interface imglocation {
  checksum?: string | null;

  /**
   * 图片描述
   */
  img_desc?: string | null;

  /**
   * 图片格式
   */
  img_format?: string | null;

  /**
   * 图片高
   */
  img_height?: Int | null;

  /**
   * 图片序列号
   */
  img_index?: Int | null;

  /**
   * 图片路径
   */
  img_path?: string | null;

  /**
   * 图片大小
   */
  img_size?: Int | null;

  /**
   * 图片原始url
   */
  img_src?: string | null;

  /**
   * 图片类型
   */
  img_type?: string | null;

  /**
   * 图片宽
   */
  img_width?: Int | null;
}

export interface inputprompt {
  /**
   * 游戏名称集合
   */
  game_names?: (GamePromptStruct | null)[] | null;
}

/**
 * item type
 */
export enum itemType {
  /**
   * game
   */
  GAME = 'GAME',
}

export interface link {
  /**
   * 标题
   */
  title?: string | null;

  /**
   * url
   */
  url?: string | null;
}

export interface links {
  id?: Int | null;

  /**
   * 名称
   */
  name?: string | null;

  /**
   * 链接url
   */
  url?: string | null;
}

export interface name {
  /**
   * 名称
   */
  content?: string | null;

  /**
   * 语言
   */
  lang?: string | null;
}

export interface names {
  /**
   * 别名
   */
  alias?: string | null;

  /**
   * 英语
   */
  en_us?: string | null;

  /**
   * 全名
   */
  formal?: string | null;

  /**
   * 日语
   */
  ja_jp?: string | null;

  /**
   * 曾用名
   */
  old?: string | null;

  /**
   * 简称/缩写
   */
  short?: string | null;

  /**
   * 汉语
   */
  zh_cn?: string | null;
}

export interface orderBy {
  /**
   * Sorting direciton. Only ASC and DESC are supported.
   *
   * @default direction.ASC
   */
  direction?: direction;

  /**
   * 要按排序的字段名
   *
   * @default "id"
   */
  field?: string;
}

export interface price {
  /**
   * 货币/货币ID，根据source区分
   */
  currency?: string | null;

  /**
   * 当天日期，去掉时分秒后转timestamp
   */
  date?: Int | null;

  /**
   * 价格，*100（整数），为0则为免费。数据有误则为null
   */
  price?: Int | null;

  store?: string | null;

  store_name?: string | null;

  /**
   * 1-售价/2-折扣价/3-会员价/4-会员折扣价/0-其他
   */
  type?: Int | null;

  type_name?: string | null;

  /**
   * 唯一爬取url， 爬虫真实爬取时详情页url（微信特殊)
   */
  url?: string | null;

  /**
   * 抓取地址响应url str（真实可用地址)
   */
  url_response?: string | null;
}

export interface publishers {
  /**
   * 不同地区的发行方
   */
  publisher?: collection | null;

  /**
   * 地区
   */
  region?: string | null;
}

export interface rating {
  /**
   * html正文
   */
  contents_html?: string | null;

  /**
   * 文本正文
   */
  contents_text?: string | null;

  id?: Int | null;

  /**
   * 名称
   */
  name?: string | null;

  system?: string | null;
}

export interface score {
  aggregated_score?: Int | null;

  aggregated_score_count?: Int | null;

  /**
   * 当天日期，去掉时分秒后转timestamp
   */
  date?: Int | null;

  /**
   * 得分。始终使用百分制。
   */
  score?: Int | null;

  score_count?: Int | null;

  store?: string | null;

  store_name?: string | null;

  /**
   * 总评价数
   */
  total_score?: Int | null;

  /**
   * 在个别评分中附带的链接
   */
  url?: string | null;
}

export interface screenshots {
  /**
   * 图片描述
   */
  desc?: string | null;

  /**
   * 图片格式
   */
  format?: string | null;

  /**
   * 图片高
   */
  height?: string | null;

  /**
   * 图片序列号
   */
  index?: string | null;

  /**
   * 图片路径
   */
  path?: string | null;

  /**
   * 图片大小
   */
  size?: Int | null;

  /**
   * 图片原始url
   */
  src?: string | null;

  /**
   * 图片类型
   */
  type?: string | null;

  /**
   * 图片宽
   */
  width?: string | null;
}

export interface section {
  /**
   * 内容html
   */
  content_html?: string | null;

  id?: string | null;

  /**
   * 是否展示本片段
   */
  is_show?: Int | null;

  /**
   * 联运内容位置
   */
  position?: Int | null;
}

export interface user {
  user_badge?: Int | null;

  /**
   * 用户id
   */
  user_id?: Int | null;

  /**
   * 用户名
   */
  user_name?: string | null;

  user_url?: string | null;
}

export interface videolocation {
  checksum?: string | null;

  flag?: boolean | null;

  message?: string | null;

  video_code?: string | null;

  /**
   * 视频长度 （秒）
   */
  video_duration?: string | null;

  /**
   * 视频格式
   */
  video_format?: string | null;

  /**
   * 视频帧数
   */
  video_fps?: string | null;

  video_frame_count?: Int | null;

  /**
   * 视频高
   */
  video_height?: Int | null;

  /**
   * 视频序列数
   */
  video_index?: Int | null;

  /**
   * 视频路径
   */
  video_path?: string | null;

  /**
   * 视频下载源
   */
  video_src?: string | null;

  /**
   * 视频宽
   */
  video_width?: Int | null;
}

export interface videos {
  /**
   * 视频描述
   */
  desc?: string | null;

  /**
   * 视频格式
   */
  format?: string | null;

  /**
   * 视频高
   */
  height?: string | null;

  /**
   * 视频序列号
   */
  index?: string | null;

  length?: string | null;

  /**
   * 视频路径
   */
  path?: string | null;

  /**
   * 视频大小
   */
  size?: Int | null;

  /**
   * 视频原始url
   */
  src?: string | null;

  status?: string | null;

  /**
   * 视频类型
   */
  type?: string | null;

  /**
   * 视频宽
   */
  width?: string | null;
}
