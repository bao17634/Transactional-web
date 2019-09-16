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
import org.springframework.context.annotation.Primary;

import com.byr.config.prop.PostgreSqlProperties;
import com.byr.utils.PojoUtil;

@Configuration
@MapperScan(basePackages = MysqlDataSourceConfig.PACKAGE, sqlSessionFactoryRef = "systemSqlSessionFactory")
public class MysqlDataSourceConfig {

	static final String PACKAGE = "com.byr.myselfdemo.mapper.mysql_mapper";

	@Autowired
	private PostgreSqlProperties postgreSqlProperties;

	@Bean(name = "systemDataSource")
	@Primary
	public DataSource systemDataSource() {
		AtomikosDataSourceBean ds = new AtomikosDataSourceBean();
		ds.setXaProperties(PojoUtil.obj2Properties(postgreSqlProperties));
		ds.setXaDataSourceClassName("com.alibaba.druid.pool.xa.DruidXADataSource");
		ds.setUniqueResourceName("systemDataSource");
		ds.setPoolSize(5);
		ds.setTestQuery("SELECT 1");
		return ds;
	}

	@Bean
	@Primary
	public SqlSessionFactory systemSqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().
				getResources("classpath*:com/byr/myselfdemo/mapper/mysql_mapper/mapper_xml/*.xml"));
		sqlSessionFactoryBean.setDataSource(systemDataSource());
		return sqlSessionFactoryBean.getObject();
	}
}
