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
                'Lineage check passed — court records batch',
                'DOT compliance audit — 100% current',
                'MDM match rate held at integrity target',
                'FinOps policy applied — lifecycle tier updated',
                'RAG log validation complete — 0 schema breaks',
                'Billing OCR reconciliation — exceptions queued',
                'Pipeline uptime window — 99.9%'
            ]},
            { type: 'info', messages: [
                'Profiling public-record dataset...',
                'Mapping data flow for threat model',
                'Syncing metadata catalog',
                'Compiling C-suite governance brief',
                'Checking certification freshness',
                'Indexing provider master records'
            ]},
            { type: 'warning', messages: [
                'Schema drift in staging — review queued',
                'PII field missing classification tag',
                'Stale certification — notify compliance',
                'Cloud lifecycle policy due for review'
            ]}
        ];

        let lastLogMessage = '';

        function generateLog() {
            const logContainer = document.getElementById('terminalLogs');
            const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
            let randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
            let guard = 0;
            while (randomMessage === lastLogMessage && guard < 4) {
                randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];
                guard += 1;
            }
            lastLogMessage = randomMessage;
            
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
                impact: 'Pattern for reviewing query drift before a governance sign-off. Outcome figures on this site come from the resume, not from this sample.'
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
                impact: 'Pattern for pipeline health, error types, and throughput. Resume outcomes: 99.9% uptime and 1.3M records per day.'
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
                document.querySelectorAll('.tableau-tab').forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                document.querySelectorAll('.tableau-view').forEach(view => view.classList.remove('active'));
                const viewEl = document.getElementById('view-' + tabId);
                if (viewEl) {
                    viewEl.classList.add('active');
                    viewEl.querySelectorAll('.bar, .ring-value, .gauge-value').forEach(function (bar) {
                        bar.style.animation = 'none';
                        void bar.offsetWidth;
                        bar.style.animation = '';
                    });
                }
            });
        });

        // Chart placeholders: open SQL panel by data-sql (works in all tab views)
        document.addEventListener('click', function(event) {
            const placeholder = event.target.closest('[data-sql]');
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
            if (event.target.closest('[data-sql]')) return;
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

        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const placeholder = event.target.closest('[data-sql]');
            if (!placeholder) return;
            event.preventDefault();
            const queryId = placeholder.getAttribute('data-sql');
            if (queryId) openSQLPanel(queryId);
        });

        const closeSql = document.getElementById('closeSqlPanel');
        if (closeSql) closeSql.addEventListener('click', closeSQLPanel);

        (function motionLayer() {
            var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            function setCount(el) {
                var target = parseFloat(el.getAttribute('data-count'));
                var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                var suffix = el.getAttribute('data-suffix') || '';
                if (!isFinite(target)) return;
                el.textContent = target.toFixed(decimals) + suffix;
            }

            function animateCount(el) {
                var target = parseFloat(el.getAttribute('data-count'));
                var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                var suffix = el.getAttribute('data-suffix') || '';
                if (!isFinite(target)) return;
                if (reduce) {
                    setCount(el);
                    return;
                }
                el.textContent = (0).toFixed(decimals) + suffix;
                var start = performance.now();
                var duration = 900;
                function frame(now) {
                    var t = Math.min(1, (now - start) / duration);
                    var eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = (target * eased).toFixed(decimals) + suffix;
                    if (t < 1) requestAnimationFrame(frame);
                }
                requestAnimationFrame(frame);
            }

            var seen = new WeakSet();
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.querySelectorAll('.count').forEach(function (el) {
                        if (seen.has(el)) return;
                        seen.add(el);
                        animateCount(el);
                    });
                    entry.target.classList.add('in');
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

            document.querySelectorAll('.reveal').forEach(function (el) {
                revealObserver.observe(el);
            });
            window.setTimeout(function () {
                document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
                    el.classList.add('in');
                });
            }, 1200);

            var rail = document.getElementById('timelineFill');
            var timeline = document.getElementById('careerTimeline');
            function paintRail() {
                if (!rail || !timeline) return;
                var rect = timeline.getBoundingClientRect();
                var view = window.innerHeight * 0.62;
                var traveled = view - rect.top;
                var pct = Math.max(0, Math.min(100, (traveled / rect.height) * 100));
                rail.style.height = pct + '%';
            }
            paintRail();
            window.addEventListener('scroll', paintRail, { passive: true });
            window.addEventListener('resize', paintRail);

            var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
            var sections = navLinks.map(function (link) {
                return document.querySelector(link.getAttribute('href'));
            }).filter(Boolean);

            function spy() {
                var current = sections[0];
                sections.forEach(function (section) {
                    if (section.getBoundingClientRect().top <= 140) current = section;
                });
                navLinks.forEach(function (link) {
                    var on = current && link.getAttribute('href') === '#' + current.id;
                    link.classList.toggle('is-active', Boolean(on));
                });
            }
            spy();
            window.addEventListener('scroll', spy, { passive: true });
        })();
