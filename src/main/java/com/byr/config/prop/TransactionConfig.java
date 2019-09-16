package com.byr.config.prop;

import com.atomikos.icatch.jta.UserTransactionImp;
import com.atomikos.icatch.jta.UserTransactionManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.jta.JtaTransactionManager;

import javax.transaction.TransactionManager;
import javax.transaction.UserTransaction;

/**
 * @ClassName: TransactionConfig
 * @Description: Spring事务配置
 * @Author: yanrong
 * @Date: 2019/9/9 16:17
 * @Version: 1.0
 */

@Configuration
public class TransactionConfig {

    /**
     * 配置spring的JtaTransactionManager，底层委派给atomikos进行处理
     * @return
     * @throws Throwable
     */
    @Bean(name = "transactionManager")
    @DependsOn({"userTransaction", "atomikosTransactionManager"})
    public PlatformTransactionManager transactionManager() throws Throwable {
        UserTransaction userTransaction = userTransaction();
        TransactionManager atomikosTransactionManager = atomikosTransactionManager();
        JtaTransactionManager jtaTransactionManager = new JtaTransactionManager(userTransaction, atomikosTransactionManager);
        jtaTransactionManager.setAllowCustomIsolationLevels(true);
        return jtaTransactionManager;
    }

    /**
     * 配置atomikos事务管理
     * TransactionManager 定义有关事务的开始、提交、撤回等操作
     * @return
     * @throws Throwable
     */
    @Bean(name = "atomikosTransactionManager")
    public TransactionManager atomikosTransactionManager() throws Throwable {
        try{
            UserTransactionManager userTransactionManager = new UserTransactionManager();
            userTransactionManager.setForceShutdown(true);
            return userTransactionManager;
        }catch (Throwable e){
            throw new Throwable(e);
        }
    }
    /**
     * 配置atomikos事务管理
     * @return
     * @throws Throwable
     */
    @Bean(name = "userTransaction")
    public UserTransaction userTransaction() throws Throwable {
        UserTransactionImp userTransactionImp = new UserTransactionImp();
        userTransactionImp.setTransactionTimeout(10000);
        return userTransactionImp;
    }
}
