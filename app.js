        (function portfolioGhostUnlock() {
            var PHRASE = 'Splash';
            var PHRASE_HASH_HEX = 'c3fa854c3d0cb74555b4004fb23812b3b351ec66dcea638d8a6e8d3382d7b46d';

            var LINKEDIN_URL_B64 = 'aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2RlYmFyaXMtZXp1bWFoLWI3MWE4NjIzMy8=';

            function applyUnlock() {
                document.body.classList.add('portfolio-unlocked');
                var input = document.getElementById('portfolioGhostPass');
                if (input) input.value = '';
                var li = document.querySelector('.portfolio-linkedin-btn');
                if (li && LINKEDIN_URL_B64) {
                    try {
                        li.href = atob(LINKEDIN_URL_B64);
                        li.setAttribute('title', 'LinkedIn');
                    } catch (e) { /* ignore */ }
                }
            }

            function sha256Hex(str) {
                var enc = new TextEncoder().encode(str);
                return crypto.subtle.digest('SHA-256', enc).then(function (digest) {
                    return Array.from(new Uint8Array(digest))
                        .map(function (b) { return b.toString(16).padStart(2, '0'); })
                        .join('');
                });
            }

            function tryUnlockFromInput(value) {
                var trimmed = (value || '').trim();
                if (!trimmed) return;
                sha256Hex(trimmed).then(function (hex) {
                    if (hex === PHRASE_HASH_HEX) applyUnlock();
                });
            }

            /* Intentionally no sessionStorage/localStorage: each page load stays locked until passphrase (Splash). */

            var ghostBuf = '';
            var ghostTimer = null;

            function resetGhostBuf() {
                ghostBuf = '';
            }

            function pushGhostKey(char) {
                ghostBuf += char;
                if (ghostBuf.length > PHRASE.length) {
                    ghostBuf = ghostBuf.slice(-PHRASE.length);
                }
                clearTimeout(ghostTimer);
                ghostTimer = setTimeout(resetGhostBuf, 2200);
                if (ghostBuf === PHRASE) {
                    applyUnlock();
                    resetGhostBuf();
                }
            }

            function isTextInputTarget(el) {
                if (!el) return false;
                var tag = el.tagName && el.tagName.toLowerCase();
                if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
                if (el.isContentEditable) return true;
                return false;
            }

            document.addEventListener('keydown', function (e) {
                if (document.body.classList.contains('portfolio-unlocked')) return;
                if (isTextInputTarget(e.target)) return;
                if (e.key === 'Escape') {
                    resetGhostBuf();
                    return;
                }
                if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    pushGhostKey(e.key);
                }
            });

            var ghostInput = document.getElementById('portfolioGhostPass');
            if (ghostInput) {
                ghostInput.addEventListener('input', function () {
                    tryUnlockFromInput(ghostInput.value);
                });
                ghostInput.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        tryUnlockFromInput(ghostInput.value);
                    }
                });
            }

        })();

        // Terminal log generation
        const logTypes = [
            { type: 'success', messages: [
                'ETL pipeline executed successfully',
                'Data validation complete - 0 errors',
                'Query optimization reduced runtime by 45%',
                'AWS S3 sync completed - 2.4M records',
                'Spark job finished - 100% data integrity',
                'PostgreSQL vacuum analyze complete',
                'Cache invalidation successful',
                'Backup completed - 500GB transferred'
            ]},
            { type: 'info', messages: [
                'Loading dimensional model...',
                'Connecting to Redshift cluster',
                'Indexing fact tables',
                'Compiling user analytics',
                'Analyzing query execution plan',
                'Monitoring pipeline throughput',
                'Syncing data catalog metadata'
            ]},
            { type: 'warning', messages: [
                'High memory usage detected - 87%',
                'Slow query alert - Customer_Orders view',
                'Schema drift detected in staging',
                'Network latency spike - 250ms'
            ]}
        ];

        function generateLog() {
            const logContainer = document.getElementById('terminalLogs');
            const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
            
            const now = new Date();
            const timestamp = now.toTimeString().split(' ')[0];
            
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            const time = document.createElement('span');
            time.className = 'log-time';
            time.textContent = '[' + timestamp + ']';
            const msg = document.createElement('span');
            msg.className = 'log-' + randomType.type;
            msg.textContent = randomMessage;
            logEntry.appendChild(time);
            logEntry.appendChild(document.createTextNode(' '));
            logEntry.appendChild(msg);
            
            logContainer.appendChild(logEntry);
            
            // Keep only last 20 logs
            while (logContainer.children.length > 20) {
                logContainer.removeChild(logContainer.firstChild);
            }
            
            // Auto scroll to bottom
            logContainer.scrollTop = logContainer.scrollHeight;
        }

        // Generate initial logs
        for (let i = 0; i < 10; i++) {
            setTimeout(() => generateLog(), i * 300);
        }

        // Continue generating logs
        setInterval(generateLog, 3000);

        // SQL Panel functionality
        const sqlQueries = {
            query1: {
                title: 'Performance Optimization Query',
                description: 'Complex window function with CTE for query performance analysis',
                query: `<span class="sql-comment">-- Optimized query using CTEs and window functions</span>
<span class="sql-keyword">WITH</span> query_metrics <span class="sql-keyword">AS</span> (
    <span class="sql-keyword">SELECT</span> 
        query_id,
        execution_time_ms,
        rows_processed,
        <span class="sql-keyword">LAG</span>(execution_time_ms) <span class="sql-keyword">OVER</span> (
            <span class="sql-keyword">PARTITION BY</span> query_type 
            <span class="sql-keyword">ORDER BY</span> timestamp
        ) <span class="sql-keyword">AS</span> prev_exec_time,
        <span class="sql-keyword">AVG</span>(execution_time_ms) <span class="sql-keyword">OVER</span> (
            <span class="sql-keyword">PARTITION BY</span> query_type 
            <span class="sql-keyword">ORDER BY</span> timestamp 
            <span class="sql-keyword">ROWS BETWEEN</span> 6 <span class="sql-keyword">PRECEDING AND CURRENT ROW</span>
        ) <span class="sql-keyword">AS</span> moving_avg_7day
    <span class="sql-keyword">FROM</span> performance_logs
    <span class="sql-keyword">WHERE</span> timestamp >= <span class="sql-keyword">CURRENT_DATE</span> - <span class="sql-keyword">INTERVAL</span> '30 days'
)
<span class="sql-keyword">SELECT</span> 
    query_id,
    execution_time_ms,
    <span class="sql-keyword">ROUND</span>(
        ((execution_time_ms - prev_exec_time) / prev_exec_time::numeric) * 100, 
        2
    ) <span class="sql-keyword">AS</span> pct_change,
    moving_avg_7day,
    <span class="sql-keyword">CASE</span> 
        <span class="sql-keyword">WHEN</span> execution_time_ms < moving_avg_7day * 0.8 <span class="sql-keyword">THEN</span> 'Optimized'
        <span class="sql-keyword">WHEN</span> execution_time_ms > moving_avg_7day * 1.2 <span class="sql-keyword">THEN</span> 'Degraded'
        <span class="sql-keyword">ELSE</span> 'Normal'
    <span class="sql-keyword">END AS</span> performance_status
<span class="sql-keyword">FROM</span> query_metrics
<span class="sql-keyword">WHERE</span> prev_exec_time <span class="sql-keyword">IS NOT NULL</span>
<span class="sql-keyword">ORDER BY</span> execution_time_ms <span class="sql-keyword">DESC</span>
<span class="sql-keyword">LIMIT</span> 100;`,
                impact: '45% reduction in average query time, identified 12 slow queries for optimization'
            },
            query2: {
                title: 'ETL Pipeline Monitoring',
                description: 'Real-time pipeline health monitoring with aggregation',
                query: `<span class="sql-comment">-- Pipeline throughput analysis with error tracking</span>
<span class="sql-keyword">SELECT</span> 
    pipeline_name,
    <span class="sql-keyword">DATE_TRUNC</span>('hour', execution_start) <span class="sql-keyword">AS</span> hour,
    <span class="sql-keyword">COUNT</span>(*) <span class="sql-keyword">AS</span> total_runs,
    <span class="sql-keyword">SUM</span>(<span class="sql-keyword">CASE WHEN</span> status = 'success' <span class="sql-keyword">THEN</span> 1 <span class="sql-keyword">ELSE</span> 0 <span class="sql-keyword">END</span>) <span class="sql-keyword">AS</span> successful_runs,
    <span class="sql-keyword">ROUND</span>(
        <span class="sql-keyword">AVG</span>(records_processed)::numeric, 
        0
    ) <span class="sql-keyword">AS</span> avg_records,
    <span class="sql-keyword">PERCENTILE_CONT</span>(0.95) <span class="sql-keyword">WITHIN GROUP</span> (
        <span class="sql-keyword">ORDER BY</span> duration_seconds
    ) <span class="sql-keyword">AS</span> p95_duration,
    <span class="sql-keyword">STRING_AGG</span>(
        <span class="sql-keyword">DISTINCT</span> error_type, 
        ', '
    ) <span class="sql-keyword">FILTER</span> (<span class="sql-keyword">WHERE</span> status = 'failed') <span class="sql-keyword">AS</span> error_types
<span class="sql-keyword">FROM</span> etl_execution_log
<span class="sql-keyword">WHERE</span> 
    execution_start >= <span class="sql-keyword">NOW</span>() - <span class="sql-keyword">INTERVAL</span> '7 days'
    <span class="sql-keyword">AND</span> environment = 'production'
<span class="sql-keyword">GROUP BY</span> 
    pipeline_name, 
    <span class="sql-keyword">DATE_TRUNC</span>('hour', execution_start)
<span class="sql-keyword">HAVING</span> 
    <span class="sql-keyword">COUNT</span>(*) > 0
<span class="sql-keyword">ORDER BY</span> 
    hour <span class="sql-keyword">DESC</span>, 
    pipeline_name;`,
                impact: '99.8% pipeline success rate, reduced data processing time by 34%'
            }
        };

        function openSQLPanel(queryId) {
            const panel = document.getElementById('sqlPanel');
            const content = document.getElementById('sqlPanelContent');
            const query = sqlQueries[queryId];
            content.replaceChildren();
            const block = document.createElement('div');
            block.className = 'sql-query-block';
            const title = document.createElement('div');
            title.className = 'query-label';
            title.textContent = query.title;
            const desc = document.createElement('p');
            desc.style.color = 'var(--text-secondary)';
            desc.style.marginBottom = '1.5rem';
            desc.style.lineHeight = '1.6';
            desc.textContent = query.description;
            const sqlLabel = document.createElement('div');
            sqlLabel.className = 'query-label';
            sqlLabel.textContent = 'SQL Query';
            const pre = document.createElement('pre');
            pre.className = 'sql-code';
            pre.textContent = String(query.query).replace(/<[^>]+>/g, '');
            const impactLabel = document.createElement('div');
            impactLabel.className = 'query-label';
            impactLabel.style.marginTop = '2rem';
            impactLabel.textContent = 'Business Impact';
            const impact = document.createElement('p');
            impact.style.color = 'var(--accent-green)';
            impact.style.fontSize = '1rem';
            impact.style.lineHeight = '1.6';
            impact.textContent = query.impact;
            block.append(title, desc, sqlLabel, pre, impactLabel, impact);
            content.appendChild(block);
            
            panel.classList.add('active');
        }

        function closeSQLPanel() {
            document.getElementById('sqlPanel').classList.remove('active');
        }

        // Tableau tab switching – show the matching dashboard view
        document.querySelectorAll('.tableau-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                if (!tabId) return;
                document.querySelectorAll('.tableau-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.tableau-view').forEach(view => view.classList.remove('active'));
                const viewEl = document.getElementById('view-' + tabId);
                if (viewEl) viewEl.classList.add('active');
            });
        });

        // Chart placeholders: open SQL panel by data-sql (works in all tab views)
        document.addEventListener('click', function(event) {
            const placeholder = event.target.closest('.chart-placeholder[data-sql]');
            if (placeholder) {
                const queryId = placeholder.getAttribute('data-sql');
                if (queryId) openSQLPanel(queryId);
            }
        });

        // Close SQL panel when clicking overlay (outside panel)
        document.addEventListener('click', function(event) {
            const panel = document.getElementById('sqlPanel');
            if (!panel.classList.contains('active')) return;
            if (panel.contains(event.target)) return;
            if (event.target.closest('.chart-placeholder')) return;
            closeSQLPanel();
        });

        // Close SQL panel with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') closeSQLPanel();
        });

        // Prevent body scroll when SQL panel is open (keeps alive look intact)
        const sqlPanel = document.getElementById('sqlPanel');
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.attributeName === 'class') {
                    document.body.style.overflow = sqlPanel.classList.contains('active') ? 'hidden' : '';
                }
            });
        });
        observer.observe(sqlPanel, { attributes: true });
