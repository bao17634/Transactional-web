package com.byr.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import tk.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jta.atomikos.AtomikosDataSourceBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.byr.config.prop.MysqlProperties;
import com.byr.utils.PojoUtil;

@Configuration
@MapperScan(value = "com.byr.myselfdemo.mapper.postgresql_mapper",basePackages = PostgreSqlDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "businessSqlSessionFactory")
public class PostgreSqlDataSourceConfig {

	static final String PACKAGE = "com.byr.myselfdemo.mapper.postgresql_mapper";
	@Autowired
	private MysqlProperties mysqlProperties;

    /**
     * 配置数据源
     * DruidXADataSource 连接池实现了XAResource接口用来进行对资源操作
     * @return
     */
	@Bean(name = "businessDataSource")
    public DataSource businessDataSource() {
        AtomikosDataSourceBean ds = new AtomikosDataSourceBean();
        ds.setXaProperties(PojoUtil.obj2Properties(mysqlProperties));
        ds.setXaDataSourceClassName("com.alibaba.druid.pool.xa.DruidXADataSource");
        ds.setUniqueResourceName("businessProperties");
        ds.setPoolSize(5);
		ds.setTestQuery("SELECT 1");
        return ds;
    }

	@Bean
	public SqlSessionFactory businessSqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		//这里必须制定xml文件的位置，不然mapper会找不到方法
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().
                getResources("classpath*:com/byr/myselfdemo/mapper/postgresql_mapper/mapper_xml/*.xml"));
		sqlSessionFactoryBean.setDataSource(businessDataSource());
		return sqlSessionFactoryBean.getObject();
	}

}
